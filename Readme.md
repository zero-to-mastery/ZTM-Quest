# ZTM Quest - A Journey Begins

![image](./public/game_cover.png)

Whether you're an experienced game developer, a Javascript expert, an HTML and CSS pro, or have never worked with any of these, this project is designed for everyone who's interested in creating something new and special. The core languages used in this project are Javascript, HTML, and CSS, enhanced with the magic of kaplay.js (formerly kaboom.js). However, even if you're not familiar with Javascript, you can still contribute by submitting non-code pull requests. We also need game assets like spritesheets, music, or even ideas in the form of a screenplay, which will serve as a guide for developers to create assets that align with the project's vision.

Let's see how far we can get and where the game will lead into.

## Rules

There are some rules regarding contributions (especially during hacktoberfest)
- No competition who resolves a issues first or who fixes a pull request first. Helping each other is good and important but creating pressure doesn't help
- Fixing just one typo per pull request is not really considered adding a lot of value. Make sure you add real value by contributing to the game itself with logic, assets or screenplays
- We know that everyone wants his/her pull request as fast merged as possible. Remember, this is a open source project and each person who works on it, does so in his/her freetime. Also the maintainers!
- If a pull request got reviewed and problems were found, we will reject it first and request changes as long as the pull request is valid. No need to panic here. Just something which is common practice
- If you add game assets or entire new maps to the game, make sure to keep track of any credits and shout outs which we have to make for third party resources. Altough they might be free to use, it is more than fair to give creative artists credit for their work. Even if it is a self-made asset, add yourself to the [asset_credits](./asset_credits.md) file


## How to get started

### Forking & Cloning the repository

Forking the repository is as easy as hitting the fork button in this repo.
After the fork process, you can then

```bash
git clone https://github.com/<your-username>/ZTM-Quest.git
```

Or even better if you have set up ssh for your github account with
```bash
git clone git@github.com:<your-username>/ZTM-Quest.git
```

After cloning it, you have to set up the upstream to be able to sync your local repository with the current version of this repository by running
```bash
cd ZTM-Quest
git remote add upstream git@github.com:zero-to-mastery/ZTM-Quest.git
```

So every now and then - or better said each time you start working, you should run
```bash
git pull upstream main
```

In order to get the latest code and avoid merge conflicts in advance.

### Setup the project itself

You should already be in the ZTM-Quest directory. If not just cd into it by running
```bash
cd ZTM-Quest
```
Make sure you use the entire path where you have cloned it into.
Inside run
```bash
npm install
```

This should set everything up and you should be good to go.


### Scripts
You can run the dev server with hot module reloading with

```bash
npm run dev
```

## Recommendations

Here are some tools which I can recommend regarding game assets

- For map creation: [Tiled](https://www.mapeditor.org/)
- For music creation: [CakeWalk](https://www.bandlab.com/products/cakewalk) even a mobile app is avalable
