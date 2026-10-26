# Building Abdullah's portfolio and digital twin: a beginner's walkthrough

This tutorial explains the website in this folder from the ground up. It assumes you have never written frontend code. By the end, you should understand what each important file does, how a visitor's question reaches OpenRouter, and where to make your first changes.

The site began with `../linkedin.pdf`. I used its career details to write the page and the AI profile. **The running website does not read the PDF automatically.** Its visible copy lives in `app/page.tsx`, and the facts supplied to the AI live in `app/api/chat/route.ts`.

## 1. What the finished site does

A visitor can read about Abdullah Fareed, follow his education and development journey, explore the Neighbour Alerts project, see a space reserved for future portfolio work, and use the email and LinkedIn links. A floating **Digital Twin** button opens a chat about his career. The chat calls the exact OpenRouter model `openai/gpt-oss-120b` through a server route.

The project is a **Next.js application**, so it has both a browser-facing side and a small server-side part. That distinction matters: the browser draws the page and handles clicks; the server keeps the API key private and talks to OpenRouter.

## 2. Technology summary

| Technology | What it means here | Where to look |
| --- | --- | --- |
| HTML and JSX | Elements such as headings, links, sections, forms, and buttons. JSX is the HTML-like syntax written inside React files. | `app/page.tsx`, `app/components/DigitalTwinChat.tsx` |
| CSS | Colors, type, spacing, layout, animation, and mobile styles. | `app/globals.css` |
| React | Components and state that make the chat respond to typing and clicks. | `DigitalTwinChat.tsx` |
| TypeScript | JavaScript with types that help catch mistakes while building. `.tsx` files contain TypeScript plus JSX. | All `.ts` and `.tsx` files |
| Next.js 16 App Router | Connects files to URLs, renders the page, and runs the server-side chat endpoint. | `app/page.tsx`, `app/layout.tsx`, `app/api/chat/route.ts` |
| Node.js | Runs Next.js on your computer and lets the server route call OpenRouter. | Used by the `dev`, `build`, and `start` commands |
| OpenRouter | Receives the career question and returns a model-generated answer. | Called only from `app/api/chat/route.ts` |
| Environment variable | A value loaded from `.env` while the server runs. Here it holds the private OpenRouter key. | `.env`, read with `process.env.OPENROUTER_API_KEY` |

**A useful distinction:** the page mentions React, Tailwind CSS, Firebase, and MERN as Abdullah's skills. This website itself uses React and ordinary CSS. It does not install Tailwind, Firebase, a database, or a MERN backend.

### A tiny syntax primer

If the code is completely new to you, keep these translations nearby:

| Code | Read it as |
| --- | --- |
| `const name = "Abdullah"` | Create a value named `name`. |
| `function Home() { ... }` | Define a reusable block of instructions called `Home`. |
| `<h1>{name}</h1>` | Put the JavaScript value of `name` inside an HTML-like element. |
| `type Message = { ... }` | Describe what fields a message must have. TypeScript checks this while building. |
| `async` and `await` | Work with a request that takes time, while writing the steps in a readable order. |
| `...messages` | Spread the entries of one array into another array. |

You do not need to memorize all of this first. Find the line mentioned in each section below and compare it with the explanation beside it.

## 3. Run the project locally

Open PowerShell in `D:\Vibe_Coded_ed_porjects\site`. Install dependencies once, then start the development server:

```powershell
cd D:\Vibe_Coded_ed_porjects\site
npm install
npm run dev
```

Open `http://127.0.0.1:3000` in a browser. The direct chat link is `http://127.0.0.1:3000/?chat=open`.

If PowerShell blocks the `npm` script on this computer, use the npm CLI through Node instead:

```powershell
node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' install
node 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run dev
```

The site already has an `.env` file. For chat to work on another machine, that file needs a line like this, using a real key in place of the placeholder:

```dotenv
OPENROUTER_API_KEY=your_openrouter_key_here
```

Restart the server after changing `.env`. Never paste the real key into `page.tsx`, a browser component, or this tutorial. `.gitignore` excludes `.env` so it is not included with normal Git changes.

For a production-style local check, stop the development server and run:

```powershell
npm run build
npm run start
```

`build` checks and prepares the app. `start` serves that build. The chat needs a running Next.js server; exporting only static HTML would leave `/api/chat` unavailable.

## 4. Map of the project

```text
site/
├─ app/
│  ├─ api/chat/route.ts            Server endpoint for AI answers
│  ├─ components/DigitalTwinChat.tsx  Interactive browser chat
│  ├─ globals.css                  All page and chat styles
│  ├─ layout.tsx                   Shared HTML shell and page metadata
│  └─ page.tsx                     Main portfolio page
├─ public/favicon.svg             Small AF browser-tab icon
├─ .env                           Private OpenRouter key; ignored by Git
├─ .gitignore                     Files Git should leave out
├─ next.config.ts                 Next.js settings
├─ package.json                   Dependencies and commands
├─ package-lock.json              Exact installed dependency versions
└─ tsconfig.json                  TypeScript settings
```

Next.js creates `.next/` when it builds or runs. `node_modules/` contains installed packages. Both are generated and excluded by `.gitignore`; you normally edit the files under `app/`, not those directories.

## 5. The big picture: browser, server, and model

When someone opens the site, this is the path the code follows:

```text
Browser requests /
    ↓
Next.js renders app/layout.tsx around app/page.tsx
    ↓
Browser loads CSS and activates the DigitalTwinChat React component
    ↓
Visitor sends a question to POST /api/chat
    ↓
The server route validates the question and adds Abdullah's career facts
    ↓
The server calls OpenRouter with OPENROUTER_API_KEY
    ↓
The answer travels back as JSON and React displays it in the chat
```

The key idea is **separation of responsibility**. The browser needs to know what the visitor typed and what answer to show. It never needs to know the OpenRouter key. The server route needs the key, so that route is the only place that reads it.

There is no database. Chat messages are held in React state in the current browser tab, so refreshing the page starts a fresh conversation.

## 6. Detailed code review

### 6.1 `package.json`: what gets installed and which commands run

`package.json` is the project's instruction sheet for npm. The relevant part is:

```json
{
  "scripts": {
    "dev": "next dev --hostname 127.0.0.1",
    "build": "next build",
    "start": "next start --hostname 127.0.0.1"
  },
  "dependencies": {
    "next": "16.4.2",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  }
}
```

Running `npm run dev` looks up the `dev` script and launches Next.js. `react` describes components; `react-dom` renders them in a web page; `next` supplies routing, builds, and the server. The TypeScript and `@types/*` packages under `devDependencies` help the editor and build process understand types.

`next.config.ts` sets this folder as Turbopack's root and hides Next.js development indicators. `postcss.config.mjs` has an empty plugin list because this project uses plain CSS. `tsconfig.json` enables strict type checking; Next.js may update some generated-file entries in it.

### 6.2 `layout.tsx`: the outer document

Every page in this App Router folder is wrapped by `RootLayout`. The real file imports the stylesheet and sets the page's title, description, Open Graph details, and favicon:

```tsx
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`children` means “the page content to put here.” `lang="en"` tells browsers and assistive tools that the document is in English. The `metadata` object above this function gives search engines and browser tabs useful labels. The icon file itself is `public/favicon.svg`; files in `public/` are available from the site's root URL, so `/favicon.svg` finds that file.

### 6.3 `page.tsx`: the portfolio's content

`app/page.tsx` becomes the home page at `/`. It is a React **component**: a function that returns JSX. Its `Home` function returns one `<main>` containing a header, several sections, a footer, and the chat component.

These small values and helper components appear near the top:

```tsx
const linkedin = "https://www.linkedin.com/in/abdullahfareedeng";
const email = "mailto:abdullahfareedssuet@gmail.com";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label-number">{number}</span>
      <span>{children}</span>
    </div>
  );
}
```

`linkedin` and `email` avoid repeating full addresses throughout the file. `mailto:` tells the browser to open an email app. `SectionLabel` lets many sections share the same label design. The values passed into a component, such as `number`, are called **props**. `children` is whatever text or elements are placed between its opening and closing tags.

For example, the About section begins with a numbered label:

```tsx
<section id="about" className="about section-pad">
  <div className="shell">
    <SectionLabel number="01">THE PERSON BEHIND THE PIXELS</SectionLabel>
    {/* About content follows here. */}
  </div>
</section>
```

An `id` gives the section a destination for an anchor link. The navigation's `<a href="#about">About</a>` scrolls to this section. `className` assigns CSS classes; React uses `className` where plain HTML uses `class`.

The page tells a story in this order:

| Section | Purpose |
| --- | --- |
| Hero | Introduces Abdullah with the main message and visual AF graphic. |
| About | Explains his approach and current interests. |
| Journey | Shows education, frontend learning, final-year work, and AI study without inventing employment history. |
| Selected work | Presents Neighbour Alerts as an **under-development** project. The map-like image is an illustrative CSS concept, not a screenshot of a live app. |
| Capabilities | Groups the tools and kinds of products he is learning to build. |
| Portfolio | Reserves a clear place for future work instead of showing fake finished projects. |
| Contact | Provides a direct email invitation and LinkedIn link. |

Finally, `<DigitalTwinChat />` adds the floating chat button. The browser will position it over the page using CSS. The page is mostly presentation, so it does not need browser state itself.

### 6.4 `globals.css`: the visual design and mobile layout

CSS selects elements by class and tells the browser how to draw them. The site starts with **custom properties**: named color values that can be reused. Here is a shortened excerpt:

```css
:root {
  --ink: #101716;
  --paper: #f1f0ea;
  --orange: #ef6845;
}

.shell {
  width: min(100% - 96px, 1440px);
  margin-inline: auto;
}

.hero {
  background: #121a18;
  color: #f4f4ec;
}
```

`:root` defines values for the whole document. `var(--orange)` later uses the orange value. `.shell` keeps content centered and stops it growing too wide on large screens. `margin-inline: auto` gives equal left and right margins.

The hero uses CSS Grid to place text beside the abstract AF artwork:

```css
.hero-content {
  display: grid;
  grid-template-columns: 1.12fr .88fr;
  gap: 40px 30px;
  align-items: center;
}
```

`fr` is a fraction of available space. The text column receives a little more width than the artwork. The artwork and the Neighbour Alerts map concept are built from HTML elements, borders, gradients, and circles in CSS. There is no portrait or real map image to load.

A **media query** changes the rules when the screen is narrower. This excerpt shows the main idea:

```css
@media (max-width: 850px) {
  .hero-content { grid-template-columns: 1fr; }
  .desktop-nav { display: none; }
  .mobile-nav { display: block; }
}
```

On a small screen, the hero columns stack and the menu changes. Further rules at `620px` and `380px` adjust typography and spacing. The chat panel also becomes full-screen at mobile width. The stylesheet has focus styles for keyboard users and a `prefers-reduced-motion` rule that turns off most animation for people who request less movement.

The two font families are loaded through a CSS `@import` from Google Fonts. If that request is unavailable, the CSS falls back to Arial.

### 6.5 `DigitalTwinChat.tsx`: browser-side interaction

The first line is important:

```tsx
"use client";
```

Most App Router components start on the server. This directive marks the chat as a **Client Component**, allowing it to use browser events, `window`, and React hooks. A hook is a React function that helps a component remember something or react to a change.

The component uses state for five things:

```tsx
const [open, setOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
const [draft, setDraft] = useState("");
const [pending, setPending] = useState(false);
const [error, setError] = useState("");
```

`open` decides whether to show the chat panel. `messages` holds the visible conversation. `draft` is the text currently in the box. `pending` is true while a request is underway. `error` holds a message if something goes wrong. Calling a setter such as `setOpen(true)` makes React update the screen.

When someone sends a message, `send()` trims whitespace, adds the visitor's message to state, clears the input, and calls `sendConversation()`. That function sends JSON to the local server route:

```tsx
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: nextMessages.slice(-11).map(({ role, content }) => ({ role, content })),
  }),
});
```

`fetch` is the browser's HTTP request function. `POST` means “send data.” `JSON.stringify` turns a JavaScript object into text that can travel over HTTP. Only the last 11 messages are sent, and only their `role` and `content` fields are included. The server does not need the React-only `id` values.

After the server responds, the code reads JSON, appends the assistant answer, or displays a retryable error. While waiting, it shows animated dots and disables sending another question. The visitor can press Enter to send or Shift+Enter for a new line. Buttons offer starter questions; another button starts a fresh conversation.

`useEffect` handles effects outside the JSX: it opens the chat for `?chat=open`, focuses the text box, locks background scrolling, closes on Escape, keeps keyboard Tab navigation inside the panel, and scrolls to new messages. `useRef` stores references to specific DOM elements, such as the input and the bottom of the conversation.

The panel has labels such as `role="dialog"`, `aria-modal="true"`, and `role="log"`. These help assistive technology understand that a dialog is open and that new messages are being added. `renderAnswer()` turns simple `**bold**` markers in model text into React `<strong>` elements; other answer text is rendered as text, not raw HTML.

### 6.6 `app/api/chat/route.ts`: the private server endpoint

The file path maps to `/api/chat`. Its exported `POST` function runs on the server when the chat sends a request. This is where the model instructions and the OpenRouter key live.

The large `PROFILE` string contains verified career facts and response rules. It tells the model that Neighbour Alerts is under development, that the portfolio is still being built, and that employment history was not supplied. A prompt helps keep answers grounded, but an AI answer can still be wrong; important claims should be checked against the source profile.

Before calling OpenRouter, the route checks the incoming request. One check is:

```ts
if (request.headers.get("sec-fetch-site") === "cross-site") {
  return Response.json(
    { error: "This request must come from the website." },
    { status: 403 },
  );
}
```

`Sec-Fetch-Site` is a browser-supplied hint about where a request began. The route rejects an explicitly cross-site browser request. An earlier version compared the `Origin` header with `request.url`; that rejected valid local chat messages when a local proxy gave Next.js a different internal URL. The current check accepts the site's normal browser request. This check is a safeguard, not a login system or full usage limit.

The route also requires JSON, limits body and message size, and validates the message shape. This type says each message has only one of two permitted roles and a string body:

```ts
type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
```

`validMessages()` checks that the array is nonempty, has at most 11 entries, that each entry has a permitted role and nonempty content of no more than 700 characters, and that the last message is from the user. This prevents malformed input from being passed to the model.

The key is read on the server:

```ts
const key = process.env.OPENROUTER_API_KEY?.trim();
```

`process.env` is Node.js's way to read environment variables. The `?.` means “use `trim()` if the value exists.” No code in `DigitalTwinChat.tsx` reads this key, so it is not sent to the browser.

The actual model request is a server-side `fetch`. This is a shortened excerpt of the existing code:

```ts
const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "system", content: PROFILE }, ...messages],
    max_tokens: 700,
    temperature: 0.4,
  }),
  cache: "no-store",
  signal: AbortSignal.timeout(45_000),
});
```

The `Authorization` header proves the account may use OpenRouter. The `system` message supplies the career facts; `...messages` adds the conversation after it. `max_tokens` bounds the response size, `temperature` influences variation, and `AbortSignal.timeout` stops waiting after 45 seconds. A real chat request uses the OpenRouter account and may consume credits.

The route reads `choices[0].message.content` from a successful OpenRouter response and sends only `{ answer: "..." }` back to the browser. It does not forward the API key. Error responses have HTTP status codes: `400` for malformed chat data, `413` for an oversized body, `415` for a non-JSON request, `403` for an explicitly cross-site browser request, `503` for a missing key, and `502` when the upstream service fails or returns no usable answer.

## 7. Follow one question all the way through

Imagine a visitor asks, “What is Neighbour Alerts?”

1. The textarea changes `draft` as the visitor types.
2. Sending calls `send(draft)`. React adds a new `{ role: "user", content: "What is Neighbour Alerts?" }` message to the chat.
3. `sendConversation()` posts the recent messages to `/api/chat` and switches `pending` on, so the visitor sees a waiting indicator.
4. `POST()` in `route.ts` checks the request, reads the private key, and sends the question plus `PROFILE` to OpenRouter.
5. OpenRouter returns text. The route sends `{ answer: text }` to the browser.
6. React adds an assistant message and switches `pending` off. If a step fails, the panel shows an error and a Retry button.

This is why there are two `fetch` calls in the project: one from **browser to your Next.js server**, and one from **your server to OpenRouter**.

## 8. Safe first edits to try

- Change a sentence in `app/page.tsx`, save it, and refresh the page. In development mode, Next.js usually updates the browser automatically.
- Change `--orange` in `app/globals.css` to experiment with the accent color.
- Add a new question to the `suggestions` array in `DigitalTwinChat.tsx`.
- If a career fact changes, update both the page text and `PROFILE` in `route.ts`, then run `npm run build` to catch typing or build errors.
- When adding a real future project, replace the portfolio placeholder with its verified title, description, and working link. Do not present an illustrative concept as a shipped product.

## 9. Five improvements from a self-review

1. **Split the large home page into section components.** `page.tsx` currently contains almost the entire portfolio. Separate files for About, Journey, Work, and Contact would make each section easier to read and update.
2. **Organize the dense stylesheet.** Many CSS rules share long lines in `globals.css`. Formatting them and moving chat styles into a dedicated file would help a beginner find and change a selector safely.
3. **Keep career facts in one typed data source.** Facts such as degree dates and project status currently appear in both page copy and the AI prompt. A shared data module or content file would reduce the chance that the page and digital twin disagree after an update.
4. **Add automated tests for the important behavior.** The chat route should have tests for malformed requests, model failures, and the local-origin bug; the chat component should have a test that sends a message and displays a mocked answer. That would catch regressions before a user does.
5. **Add server-side rate limiting before public hosting.** The route validates request size but does not limit how frequently a visitor can call the paid model. A real usage limit would help control abuse and OpenRouter costs if the site becomes public.
