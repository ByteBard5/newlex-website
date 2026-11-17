# Projects

Every project is **one `.js` file** in this folder — the same format as the old website.
Images and videos stay on Cloudflare R2 (`BASE_URL`).

## Add a new project

1. Upload the thumbnail, result images/videos and gallery images to Cloudflare R2.
2. Copy `_template.js`, rename it (e.g. `nike-campaign.js`) and fill it in.
3. Save. That's it — the project list is rebuilt automatically every time the
   site starts (`npm run dev`) or is deployed (`npm run build`).
   While the dev server is already running, run `npm run projects` once to pick up a new file.

The project then appears:

- on the **Portfolio** page (with a filter button for its category),
- on its **own page** at `/portfolio/<slug>` (e.g. `/portfolio/nike-campaign`),
- on the **Home** page if it is among the first 6 by `order`.

## Fields

| Field              | What it does                                                                 |
| ------------------ | ---------------------------------------------------------------------------- |
| `order`            | Display order — lower numbers first                                          |
| `slug`             | Used for the page address (spaces become dashes)                             |
| `title`            | Project name                                                                 |
| `category`         | Filter button on the Portfolio page, e.g. `SOCIAL MEDIA`, `CGI & 3D`         |
| `shortDescription` | Intro sentence at the top of the project page                               |
| `thumbnail`        | Cover image. The Portfolio page crops it to 4:5 or 5:4, so keep the subject centred |
| `description`      | Optional — "Overview" section. Delete the line to hide the section           |
| `gallery`          | Optional — list of image links. Delete to hide the section                   |
| `projectType`, `software`, `resolution`, `format`, `role` | Shown in the project details panel    |
| `results`          | The final work. Images need `aspectRatio` (e.g. `"4/5"`) or `orientation: "landscape"`. Videos need `type: "video"` and an `aspectRatio` (`"16/9"` or `"9/16"`) |

## Remove or hide a project

Delete its file — or rename it to start with `_` (e.g. `_fleetx.js`) to hide it without deleting.

> `index.js` is generated automatically — don't edit it by hand.
