# Tool names, descriptions and the chat welcome line

## Chat welcome line

Paste into **Initial Message(s)** on the chat trigger:
```
Hi, I'm Ava, the Aventura Frontiers offer assistant. This is a training build with sample pay figures. Who is the offer for, and which role?
```

Paste each description into the **Description** box of the matching tool on the agent. The agent reads these to decide when to use each tool, so copy them exactly.

## Policy Tool

Name: `Policy Tool`

Description:
```
Call this tool to answer any question about the Aventura Frontiers offer policy: grades and typical titles, benefits, probation, notice period and approval rules. Send one clear question.
```

## Offer Calculator

Name: `Offer Calculator`

Description:
```
Always use this tool for every salary or money figure in an offer. Never calculate a figure yourself. Inputs: grade must be exactly one of G1, G2, G3, G4, G5. base_salary, joining_bonus and candidate_expected_salary must be plain numbers with no $ sign or text (use 0 when there is no bonus or no expectation). relocation must be exactly one of none, domestic, international. If the tool returns an error, explain it to the recruiter and ask what to change.
```

## Offer Letter Tool

Name: `Offer Letter Tool`

Description:
```
Call this tool to create the draft offer letter, only after the recruiter has confirmed the package. You need the candidate name, role title, start date, hiring manager name and email, and every field the Offer Calculator returned. The tool returns a link to the draft letter.
```

## Gmail Draft

Name: `Gmail Draft`

First set **Tool Description** to set it manually (check the exact label on screen), so a description box appears.

Settings: Resource **Draft**, Operation **Create**, Email Type **HTML**. Let the model define **Subject**, **Message** and **To Email** (To Email sits under Add option).

Description:
```
Call this tool last, to save an email draft to the hiring manager for approval. Never address it to the candidate. Include the link to the draft letter, the first-year total, the approval route and the expectation note.
```
