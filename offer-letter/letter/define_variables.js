// n8n Code node (JavaScript): "Define variables" in the Offer Letter Tool workflow.
// Paste this in place of the quote code. It adds the offer ID and dates,
// formats the money, and passes everything on to fill the letter template.

const now = new Date();
const formatDate = (d) => d.toISOString().slice(0, 10);
const pad = (n) => n.toString().padStart(2, "0");

const offer_date = formatDate(now);
// The candidate has 7 days to accept (policy section 6)
const respond_by = formatDate(new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000));
const offer_id = `O-${now.getFullYear().toString().slice(-2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

// $120,000 style formatting
const money = (n) => "$" + Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

const input = $input.last().json;

return [
  {
    json: {
      offer_id,
      offer_date,
      respond_by,

      candidate_name: input.candidate_name,
      role_title: input.role_title,
      start_date: input.start_date,
      hiring_manager_name: input.hiring_manager_name,
      hiring_manager_email: input.hiring_manager_email,

      org_name: "Aventura Frontiers",
      org_email: "people@aventurafrontiers.com",

      grade: input.grade,
      grade_title: input.grade_title,
      base_salary: money(input.base_salary),
      joining_bonus: money(input.joining_bonus),
      relocation: input.relocation,
      relocation_amount: money(input.relocation_amount),
      ld_grant: money(input.ld_grant),
      first_year_total: money(input.first_year_total),
      approval_route: input.approval_route,
      expectation_note: input.expectation_note,
    },
  },
];
