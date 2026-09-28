import { describe, expect, it } from "vitest";
import { formatTime, getOpenStatus, israelNow } from "@/lib/business";
import { translations } from "@/i18n/translations";

// Israel is UTC+3 in late September (IDT).
const at = (iso: string) => new Date(iso);

describe("opening hours (Israel time)", () => {
  it("reads weekday and minutes in Asia/Jerusalem regardless of host timezone", () => {
    expect(israelNow(at("2026-09-27T07:30:00Z"))).toEqual({ day: 0, minutes: 10 * 60 + 30 }); // Sun 10:30
  });

  it("is open on a weekday during hours", () => {
    expect(getOpenStatus(at("2026-09-28T10:00:00Z"))).toEqual({ state: "open", closesAt: "21:00" }); // Mon 13:00
  });

  it("closes at 14:30 on Friday", () => {
    expect(getOpenStatus(at("2026-10-02T11:00:00Z"))).toEqual({ state: "open", closesAt: "14:30" }); // Fri 14:00
    expect(getOpenStatus(at("2026-10-02T11:45:00Z"))).toEqual({ state: "closed", opensDay: 0, opensAt: "08:00" }); // Fri 14:45
  });

  it("is closed on Saturday and reopens Sunday", () => {
    expect(getOpenStatus(at("2026-10-03T09:00:00Z"))).toEqual({ state: "closed", opensDay: 0, opensAt: "08:00" });
  });

  it("reports a same-day opening before 08:00", () => {
    expect(getOpenStatus(at("2026-09-28T03:00:00Z"))).toEqual({ state: "closed", opensDay: 1, opensAt: "08:00" }); // Mon 06:00
  });

  it("formats times per language", () => {
    expect(formatTime("14:30", "he")).toBe("14:30");
    expect(formatTime("14:30", "en")).toBe("2:30 pm");
    expect(formatTime("08:00", "en")).toBe("8 am");
  });
});

describe("translations", () => {
  const keys = (o: unknown, prefix = ""): string[] =>
    o && typeof o === "object"
      ? Object.entries(o).flatMap(([k, v]) => keys(v, `${prefix}${k}.`))
      : [prefix];

  it("Hebrew and English have the same structure", () => {
    expect(keys(translations.en)).toEqual(keys(translations.he));
  });
});
