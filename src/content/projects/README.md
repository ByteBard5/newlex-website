# Projects

Every project is **one `.js` file** in this folder — the same format as the old website.
Pictures can go in `public/projects/<project-name>/` (easiest) or on Cloudflare R2.

## Add a new project

1. Put the pictures in a new folder, e.g. `public/projects/nike-campaign/`
   (or upload them to Cloudflare R2 and use the full links).
2. Copy `_template.js`, rename the copy (e.g. `nike-campaign.js`), set `FOLDER` and fill it in.
3. Save. That's it — the project list rebuilds itself, even while `npm run dev` is running.

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
| `year`, `services`                  | Optional — shown in the title block of the project page            |
| `client`, `challenge`, `solution`   | Optional — tabs next to the intro on the project page (`description` is the "Overview" tab) |
| `credits`                           | Optional — centred lines under the pictures (otherwise role, software, format, resolution are shown) |
| `projectType`, `software`, `resolution`, `format`, `role` | Project details |
| `results`          | The final work, one picture or video per screen. Images need `aspectRatio` (e.g. `"4/5"`) or `orientation: "landscape"`. Videos need `type: "video"` and an `aspectRatio` (`"16/9"` or `"9/16"`) |

## Remove or hide a project

Delete its file — or rename it to start with `_` (e.g. `_fleetx.js`) to hide it without deleting.

> `index.js` is generated automatically — don't edit it by hand.
