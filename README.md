# NEO Launch Pad

Live: https://neo-launch-pad.vercel.app/

Good morning, everyone! Today is a very exciting day as we prepare to launch our rocket into space.

We’ve been working hard to make sure everything is in order, and we’re confident that we’re ready to go. The weather is looking great, and we’re all feeling optimistic about the launch.

We’ll be keeping you updated throughout the day, so stay tuned for more information.

Thank you for joining us on this journey, and let’s get ready to blast off!

## Getting Started

### Node.js and npm

[Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Install project dependencies

Install all dependencies:

```bash
npm i
```

### Run the project dev server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Brief

The lead engineer at Mission Control has been tasked with building a new application to track upcoming rocket launches.

To start, they need to display a paginated list of upcoming missions fetched from the SpaceX API.
This will allow the controllers to see vital details like launch date, mission name, and flight number for all upcoming flights.

Next, the lead engineer works on building a countdown clock that will show the time remaining until the next launch.
This large display will be mounted on the wall of the control room to help coordinate the launch sequence. Real-time data is pulled from the API to make sure the countdown is accurate.

Finally, just before the big day, the team discovers a bug - the 2D rocket visualization is not showing the launch on the screen!
The lead engineer digs into the code and realizes they need to properly initialize the rocket and tie it into the countdown clock. After the quick update, the visuals should show the rocket launch on the screen.

On launch day, the new Mission Control Center application helps keep everything on schedule. The controllers use the information and tools provided to successfully get the rocket into orbit.
The lead engineer takes pride knowing their code supported the team through a successful launch!

### Mission Objectives

1. Objective 1: Add pagination support to display upcoming missions from the SpaceX API.

- Retrieve upcoming missions data from the SpaceX API.
- Only display 10 launches at a time.

2. Objective 2: Build a countdown clock that displays the time remaining until the next launch.

- Countdown timer counts down the seconds until the next upcoming launch.
- Calculate the remaining time until the next launch by subtracting the current time from the launch time.

3. Objective 3: Show the rocket launch when countdown reaches zero.

- When the countdown reaches 0, show the rocket lifting off.

#### Bonus Objectives

1. Objective B1: Show the countdown T-minus clock in a human readable format (eg. MM:DD:HH:SS).

2. Objective B2: Show the countdown T-minus clock for a launch chosen from the launch manifest.

## Debrief

Ladies and gentlemen, we have a successful launch!

The rocket is now in orbit, and we’re all very excited. We’re also very relieved that the rocket didn’t explode on the launch pad, which is always a plus.
We’re not sure what the future holds for this rocket, but we’re confident that it will continue to do great things. And if it doesn’t, well, at least we got a good laugh out of it.

Thank you for joining us on this journey, and we hope to see you again soon!
