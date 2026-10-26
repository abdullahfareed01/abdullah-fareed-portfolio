# Abdullah Fareed | Portfolio

A personal portfolio for Abdullah Fareed, a software engineering student and frontend developer in Karachi, Pakistan. The site presents his background, career journey, current skills, and Neighbour Alerts final-year project. It also includes a career-focused AI digital twin that answers visitor questions using verified profile facts.

**Live site:** <https://abdullahfareed.netlify.app/>

## About the site

- **Career story:** Education, frontend interests, and a clear path into AI engineering.
- **Project spotlight:** Neighbour Alerts, a community safety platform currently in development.
- **Portfolio links:** Space for future work as projects become ready to share.
- **Digital twin:** A server-side OpenRouter integration using `openai/gpt-oss-120b`. Its answers are grounded in the career facts in `app/api/chat/route.ts`.
- **Responsive design:** A custom visual style built with Next.js, React, TypeScript, and CSS.

The content was prepared from Abdullah's supplied LinkedIn profile. The AI assistant is an automated representation of that profile, not a live conversation with Abdullah.

## Run locally

1. Install dependencies with `npm install`.
2. Create a local `.env` file containing `OPENROUTER_API_KEY=your_key_here` to enable the digital twin.
3. Run `npm run dev`.
4. Open <http://127.0.0.1:3000>.

The API key is read by the server route and is never intentionally sent to the browser. Keep `.env` private. The portfolio still renders if the key is absent, but chat replies require it.

## Project map

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Portfolio sections, content, and links |
| `app/globals.css` | Layout, colors, type, and responsive styles |
| `app/components/DigitalTwinChat.tsx` | Chat interface |
| `app/api/chat/route.ts` | Chat validation, profile context, and OpenRouter request |
| `app/layout.tsx` | Shared page layout and metadata |

See `tutorail.md` for a beginner-friendly walkthrough of the code.
