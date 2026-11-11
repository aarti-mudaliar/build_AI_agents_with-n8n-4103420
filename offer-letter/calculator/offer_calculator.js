// Offer calculator for the Aventura Frontiers offer letter agent.
// Sample data for a training build. Not a real pay policy.
// Inputs (from the agent): grade, base_salary, joining_bonus, relocation, candidate_expected_salary
// Output: the checked offer package, ready for the offer letter tool.

const grades = {
  G1: { title: "Analyst / Coordinator",      min: 60000,  mid: 70000,  max: 80000,  bonus_cap: 5000,  ld_grant: 1000 },
  G2: { title: "Senior Analyst / Specialist", min: 75000,  mid: 87500,  max: 100000, bonus_cap: 7500,  ld_grant: 1500 },
  G3: { title: "Manager / Lead",             min: 95000,  mid: 112500, max: 130000, bonus_cap: 10000, ld_grant: 2000 },
  G4: { title: "Senior Manager",             min: 120000, mid: 142500, max: 165000, bonus_cap: 15000, ld_grant: 2500 },
  G5: { title: "Director",                   min: 150000, mid: 177500, max: 205000, bonus_cap: 25000, ld_grant: 3000 },
};

const relocationAmounts = { none: 0, domestic: 5000, international: 15000 };

// Read and tidy the inputs
const grade = String(query.grade || "").trim().toUpperCase();
const base = Number(query.base_salary);
const bonus = Number(query.joining_bonus || 0);
const relocation = String(query.relocation || "none").trim().toLowerCase();
const expected = Number(query.candidate_expected_salary || 0);

// Check the inputs. Each error says what is allowed, so the agent can correct itself.
const cfg = grades[grade];
if (!cfg) throw new Error(`Invalid grade: "${grade}". Use exactly one of: G1, G2, G3, G4, G5.`);
if (!Number.isFinite(base) || base <= 0) throw new Error("base_salary must be a plain number, for example 110000.");
if (base < cfg.min || base > cfg.max) throw new Error(`Base salary ${base} is outside the ${grade} range of ${cfg.min} to ${cfg.max}.`);
if (!Number.isFinite(bonus) || bonus < 0) throw new Error("joining_bonus must be a plain number. Use 0 if there is no bonus.");
if (bonus > cfg.bonus_cap) throw new Error(`Joining bonus ${bonus} is above the ${grade} cap of ${cfg.bonus_cap}.`);
if (!(relocation in relocationAmounts)) throw new Error(`Invalid relocation: "${relocation}". Use exactly one of: none, domestic, international.`);
if (!Number.isFinite(expected) || expected < 0) throw new Error("candidate_expected_salary must be a plain number. Use 0 if the candidate did not say.");

// Work out the package
const relocation_amount = relocationAmounts[relocation];
const ld_grant = cfg.ld_grant;
const first_year_total = base + bonus + relocation_amount + ld_grant;

// Approval rule (policy section 5)
const vp_approval_needed = base > cfg.mid;
const approval_route = vp_approval_needed
  ? "Hiring manager and VP People (base salary is above the grade midpoint)"
  : "Hiring manager";

// Candidate expectation check (policy section 5)
const usd = (n) => "$" + n.toLocaleString("en-US");
let expectation_note = "The candidate did not share a salary expectation.";
if (expected > 0) {
  const gap = expected - base;
  if (expected > cfg.max) {
    expectation_note = `The candidate expects ${usd(expected)}, which is above the ${grade} maximum of ${usd(cfg.max)}. This can't be met in this grade.`;
  } else if (gap > 0) {
    expectation_note = `The candidate expects ${usd(expected)}, which is ${usd(gap)} above the proposed base salary. The hiring manager decides.`;
  } else {
    expectation_note = `The proposed base salary meets the candidate's expectation of ${usd(expected)}.`;
  }
}

return JSON.stringify({
  grade,
  grade_title: cfg.title,
  base_salary: base,
  salary_min: cfg.min,
  salary_midpoint: cfg.mid,
  salary_max: cfg.max,
  joining_bonus: bonus,
  relocation,
  relocation_amount,
  ld_grant,
  first_year_total,
  approval_route,
  expectation_note,
});
