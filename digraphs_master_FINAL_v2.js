// === digraphs_master_FINAL_v2.js ===
// Built from digraphs_master_combined.js + digraphWordLadders_6words_full.js + digraphBlendLadders_auto.js

// Patterns & Images (built from digraphWordsDetailed)
const rWordPatterns = {
  "bench": "1112",
  "black": "1112",
  "block": "1112",
  "blush": "1112",
  "brick": "1112",
  "broth": "1112",
  "brush": "1112",
  "chest": "2111",
  "chimp": "2111",
  "chomp": "2111",
  "clash": "1112",
  "click": "1112",
  "clinch": "1112",
  "clock": "1112",
  "cloth": "1112",
  "cluck": "1112",
  "crack": "1112",
  "crash": "1112",
  "crush": "1112",
  "flash": "1112",
  "flick": "1112",
  "flinch": "11112",
  "flock": "1112",
  "flush": "1112",
  "fresh": "1112",
  "lunch": "1112",
  "munch": "1112",
  "pinch": "1112",
  "pluck": "1112",
  "plush": "1112",
  "punch": "1112",
  "shred": "2111",
  "shrug": "2111",
  "slash": "1112",
  "slick": "1112",
  "sloth": "1112",
  "smack": "1112",
  "smash": "1112",
  "smock": "1112",
  "snack": "1112",
  "speck": "1112",
  "stack": "1112",
  "stick": "1112",
  "stuck": "1112",
  "swish": "1112",
  "tenth": "1112",
  "theft": "2111",
  "thump": "2111",
  "track": "1112",
  "trick": "1112",
  "truck": "1112",
  "whisk": "2111"
};

const rWordImages = {
  "bench": "images/bench.png",
  "black": "images/black.png",
  "block": "images/block.png",
  "blush": "images/blush.png",
  "brick": "images/brick.png",
  "broth": "images/broth.png",
  "brush": "images/brush.png",
  "chest": "images/chest.png",
  "chimp": "images/chimp.png",
  "chomp": "images/chomp.png",
  "clash": "images/clash.png",
  "click": "images/click.png",
  "clinch": "images/clinch.png",
  "clock": "images/clock.png",
  "cloth": "images/cloth.png",
  "cluck": "images/cluck.png",
  "crack": "images/crack.png",
  "crash": "images/crash.png",
  "crush": "images/crush.png",
  "flash": "images/flash.png",
  "flick": "images/flick.png",
  "flinch": "images/flinch.png",
  "flock": "images/flock.png",
  "flush": "images/flush.png",
  "fresh": "images/fresh.png",
  "lunch": "images/lunch.png",
  "munch": "images/munch.png",
  "pinch": "images/pinch.png",
  "pluck": "images/pluck.png",
  "plush": "images/plush.png",
  "punch": "images/punch.png",
  "shred": "images/shred.png",
  "shrug": "images/shrug.png",
  "slash": "images/slash.png",
  "slick": "images/slick.png",
  "sloth": "images/sloth.png",
  "smack": "images/smack.png",
  "smash": "images/smash.png",
  "smock": "images/smock.png",
  "snack": "images/snack.png",
  "speck": "images/speck.png",
  "stack": "images/stack.png",
  "stick": "images/stick.png",
  "stuck": "images/stuck.png",
  "swish": "images/swish.png",
  "tenth": "images/tenth.png",
  "theft": "images/theft.png",
  "thump": "images/thump.png",
  "track": "images/track.png",
  "trick": "images/trick.png",
  "truck": "images/truck.png",
  "whisk": "images/whisk.png"
};

// Base digraph ladders (6 words each)
const digraphWordLadders = [
  [
    "bath",
    "bash",
    "lash",
    "rash",
    "gash",
    "cash"
  ],
  [
    "pick",
    "puck",
    "peck",
    "deck",
    "dock",
    "sock"
  ],
  [
    "suck",
    "puck",
    "luck",
    "lock",
    "sock",
    "sack"
  ],
  [
    "wish",
    "fish",
    "dish",
    "dash",
    "lash",
    "bash"
  ],
  [
    "sick",
    "pick",
    "peck",
    "puck",
    "pack",
    "back"
  ],
  [
    "buck",
    "duck",
    "suck",
    "tuck",
    "tack",
    "pack"
  ],
  [
    "tick",
    "sick",
    "lick",
    "luck",
    "tuck",
    "suck"
  ],
  [
    "tick",
    "kick",
    "sick",
    "sock",
    "suck",
    "tuck"
  ],
  [
    "wish",
    "fish",
    "dish",
    "dash",
    "mash",
    "bash"
  ],
  [
    "moth",
    "math",
    "path",
    "bath",
    "bash",
    "gash"
  ],
  [
    "bath",
    "path",
    "math",
    "mash",
    "dash",
    "dish"
  ],
  [
    "mash",
    "cash",
    "dash",
    "gash",
    "rash",
    "bash"
  ],
  [
    "rash",
    "cash",
    "bash",
    "mash",
    "lash",
    "dash"
  ],
  [
    "sock",
    "suck",
    "tuck",
    "puck",
    "peck",
    "pick"
  ],
  [
    "neck",
    "deck",
    "peck",
    "pick",
    "sick",
    "kick"
  ],
  [
    "tick",
    "kick",
    "sick",
    "pick",
    "peck",
    "puck"
  ],
  [
    "pick",
    "pack",
    "rack",
    "rock",
    "lock",
    "dock"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "shin",
    "chin",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "kick",
    "sick",
    "lick",
    "pick",
    "puck",
    "pack"
  ],
  [
    "wish",
    "fish",
    "dish",
    "dash",
    "lash",
    "gash"
  ],
  [
    "sock",
    "suck",
    "tuck",
    "tack",
    "pack",
    "back"
  ],
  [
    "tuck",
    "duck",
    "suck",
    "sock",
    "sack",
    "rack"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chin",
    "thin",
    "shin"
  ],
  [
    "dish",
    "dash",
    "cash",
    "lash",
    "rash",
    "rush"
  ],
  [
    "kick",
    "tick",
    "sick",
    "sack",
    "tack",
    "pack"
  ],
  [
    "math",
    "mash",
    "gash",
    "cash",
    "bash",
    "dash"
  ],
  [
    "hush",
    "rush",
    "rash",
    "dash",
    "gash",
    "mash"
  ],
  [
    "shot",
    "shop",
    "chop",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "gash",
    "rash",
    "bash",
    "lash",
    "cash",
    "dash"
  ],
  [
    "tuck",
    "buck",
    "duck",
    "suck",
    "luck",
    "lock"
  ],
  [
    "rack",
    "tack",
    "tick",
    "lick",
    "pick",
    "pack"
  ],
  [
    "dish",
    "dash",
    "cash",
    "gash",
    "mash",
    "rash"
  ],
  [
    "tick",
    "tack",
    "rack",
    "back",
    "pack",
    "sack"
  ],
  [
    "tack",
    "tuck",
    "duck",
    "dock",
    "lock",
    "rock"
  ],
  [
    "tack",
    "tuck",
    "luck",
    "lick",
    "kick",
    "tick"
  ],
  [
    "buck",
    "tuck",
    "tick",
    "kick",
    "sick",
    "pick"
  ],
  [
    "math",
    "path",
    "bath",
    "bash",
    "rash",
    "cash"
  ],
  [
    "duck",
    "luck",
    "tuck",
    "suck",
    "sick",
    "kick"
  ],
  [
    "pack",
    "tack",
    "back",
    "rack",
    "sack",
    "suck"
  ],
  [
    "rock",
    "sock",
    "suck",
    "sick",
    "tick",
    "pick"
  ],
  [
    "sock",
    "suck",
    "buck",
    "back",
    "rack",
    "tack"
  ],
  [
    "deck",
    "dock",
    "sock",
    "rock",
    "rack",
    "sack"
  ],
  [
    "chin",
    "chip",
    "chop",
    "shop",
    "shot",
    "shut"
  ],
  [
    "gash",
    "rash",
    "mash",
    "dash",
    "dish",
    "fish"
  ],
  [
    "bash",
    "bath",
    "math",
    "mash",
    "lash",
    "dash"
  ],
  [
    "dock",
    "deck",
    "neck",
    "peck",
    "puck",
    "buck"
  ],
  [
    "back",
    "tack",
    "tick",
    "sick",
    "suck",
    "puck"
  ],
  [
    "kick",
    "pick",
    "peck",
    "pack",
    "sack",
    "sock"
  ],
  [
    "dash",
    "gash",
    "cash",
    "lash",
    "mash",
    "rash"
  ],
  [
    "hush",
    "rush",
    "rash",
    "gash",
    "cash",
    "bash"
  ],
  [
    "peck",
    "pack",
    "pick",
    "tick",
    "tack",
    "rack"
  ],
  [
    "sack",
    "sock",
    "sick",
    "kick",
    "lick",
    "tick"
  ],
  [
    "deck",
    "neck",
    "peck",
    "puck",
    "duck",
    "suck"
  ],
  [
    "tack",
    "rack",
    "back",
    "buck",
    "puck",
    "pick"
  ],
  [
    "sack",
    "pack",
    "rack",
    "back",
    "buck",
    "puck"
  ],
  [
    "fish",
    "wish",
    "dish",
    "dash",
    "cash",
    "bash"
  ],
  [
    "dash",
    "gash",
    "lash",
    "mash",
    "rash",
    "cash"
  ],
  [
    "moth",
    "math",
    "path",
    "bath",
    "bash",
    "dash"
  ],
  [
    "dock",
    "sock",
    "sick",
    "kick",
    "lick",
    "luck"
  ],
  [
    "lock",
    "lick",
    "kick",
    "sick",
    "sock",
    "rock"
  ],
  [
    "suck",
    "sock",
    "dock",
    "rock",
    "lock",
    "luck"
  ],
  [
    "rock",
    "sock",
    "sick",
    "sack",
    "back",
    "pack"
  ],
  [
    "fish",
    "wish",
    "dish",
    "dash",
    "mash",
    "math"
  ],
  [
    "rack",
    "back",
    "sack",
    "pack",
    "tack",
    "tuck"
  ],
  [
    "bath",
    "bash",
    "lash",
    "mash",
    "math",
    "path"
  ],
  [
    "rack",
    "back",
    "tack",
    "tick",
    "tuck",
    "duck"
  ],
  [
    "lash",
    "bash",
    "rash",
    "gash",
    "dash",
    "cash"
  ],
  [
    "shin",
    "thin",
    "chin",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "bash",
    "rash",
    "dash",
    "dish",
    "wish",
    "fish"
  ],
  [
    "path",
    "bath",
    "bash",
    "gash",
    "mash",
    "math"
  ],
  [
    "puck",
    "luck",
    "lick",
    "kick",
    "sick",
    "tick"
  ],
  [
    "tick",
    "sick",
    "sack",
    "sock",
    "rock",
    "rack"
  ],
  [
    "shot",
    "shop",
    "chop",
    "chip",
    "chin",
    "thin"
  ],
  [
    "dock",
    "rock",
    "sock",
    "lock",
    "luck",
    "puck"
  ],
  [
    "dock",
    "duck",
    "tuck",
    "puck",
    "luck",
    "suck"
  ],
  [
    "peck",
    "puck",
    "buck",
    "tuck",
    "duck",
    "deck"
  ],
  [
    "math",
    "bath",
    "bash",
    "cash",
    "mash",
    "gash"
  ],
  [
    "cash",
    "bash",
    "lash",
    "mash",
    "math",
    "path"
  ],
  [
    "sock",
    "suck",
    "puck",
    "peck",
    "pack",
    "rack"
  ],
  [
    "lash",
    "cash",
    "bash",
    "rash",
    "mash",
    "math"
  ],
  [
    "fish",
    "wish",
    "dish",
    "dash",
    "rash",
    "rush"
  ],
  [
    "tick",
    "pick",
    "puck",
    "tuck",
    "tack",
    "rack"
  ],
  [
    "pick",
    "kick",
    "lick",
    "luck",
    "buck",
    "duck"
  ],
  [
    "hush",
    "rush",
    "rash",
    "gash",
    "cash",
    "dash"
  ],
  [
    "tack",
    "sack",
    "back",
    "buck",
    "luck",
    "lick"
  ],
  [
    "shut",
    "shot",
    "shop",
    "chop",
    "chip",
    "chin"
  ],
  [
    "peck",
    "puck",
    "tuck",
    "suck",
    "buck",
    "duck"
  ],
  [
    "back",
    "buck",
    "suck",
    "sack",
    "sock",
    "rock"
  ],
  [
    "buck",
    "puck",
    "peck",
    "pick",
    "tick",
    "tuck"
  ],
  [
    "tick",
    "lick",
    "kick",
    "pick",
    "sick",
    "suck"
  ],
  [
    "neck",
    "peck",
    "puck",
    "buck",
    "suck",
    "sock"
  ],
  [
    "sick",
    "suck",
    "puck",
    "buck",
    "duck",
    "luck"
  ],
  [
    "rash",
    "lash",
    "gash",
    "cash",
    "dash",
    "mash"
  ],
  [
    "duck",
    "puck",
    "luck",
    "lock",
    "dock",
    "sock"
  ],
  [
    "thin",
    "chin",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "luck",
    "duck",
    "suck",
    "buck",
    "back",
    "sack"
  ],
  [
    "moth",
    "math",
    "path",
    "bath",
    "bash",
    "mash"
  ],
  [
    "buck",
    "back",
    "sack",
    "sock",
    "dock",
    "duck"
  ],
  [
    "tick",
    "pick",
    "pack",
    "puck",
    "buck",
    "tuck"
  ],
  [
    "neck",
    "deck",
    "peck",
    "puck",
    "pick",
    "kick"
  ],
  [
    "peck",
    "pick",
    "sick",
    "sock",
    "dock",
    "duck"
  ],
  [
    "rush",
    "rash",
    "cash",
    "bash",
    "dash",
    "mash"
  ],
  [
    "path",
    "bath",
    "bash",
    "gash",
    "lash",
    "rash"
  ],
  [
    "dock",
    "sock",
    "sick",
    "lick",
    "lock",
    "rock"
  ],
  [
    "shut",
    "shot",
    "shop",
    "chop",
    "chip",
    "whip"
  ],
  [
    "fish",
    "wish",
    "dish",
    "dash",
    "bash",
    "rash"
  ],
  [
    "dock",
    "sock",
    "lock",
    "rock",
    "rack",
    "tack"
  ],
  [
    "shin",
    "thin",
    "chin",
    "chip",
    "chop",
    "shop"
  ],
  [
    "whip",
    "chip",
    "chop",
    "shop",
    "shot",
    "shut"
  ],
  [
    "dash",
    "lash",
    "rash",
    "gash",
    "bash",
    "bath"
  ],
  [
    "puck",
    "pick",
    "tick",
    "lick",
    "kick",
    "sick"
  ],
  [
    "wish",
    "fish",
    "dish",
    "dash",
    "rash",
    "lash"
  ],
  [
    "sack",
    "rack",
    "rock",
    "dock",
    "deck",
    "peck"
  ],
  [
    "pick",
    "puck",
    "suck",
    "buck",
    "tuck",
    "tack"
  ],
  [
    "luck",
    "tuck",
    "tick",
    "tack",
    "pack",
    "pick"
  ],
  [
    "pick",
    "pack",
    "tack",
    "tuck",
    "tick",
    "kick"
  ],
  [
    "rush",
    "rash",
    "bash",
    "cash",
    "mash",
    "math"
  ],
  [
    "lash",
    "gash",
    "bash",
    "dash",
    "rash",
    "rush"
  ],
  [
    "moth",
    "math",
    "path",
    "bath",
    "bash",
    "rash"
  ],
  [
    "tick",
    "tuck",
    "puck",
    "suck",
    "duck",
    "deck"
  ],
  [
    "sock",
    "lock",
    "dock",
    "rock",
    "rack",
    "tack"
  ],
  [
    "tack",
    "back",
    "pack",
    "sack",
    "sock",
    "dock"
  ],
  [
    "sack",
    "sock",
    "rock",
    "dock",
    "lock",
    "lick"
  ],
  [
    "puck",
    "pick",
    "pack",
    "rack",
    "tack",
    "back"
  ],
  [
    "dish",
    "dash",
    "mash",
    "lash",
    "bash",
    "gash"
  ],
  [
    "path",
    "bath",
    "bash",
    "rash",
    "lash",
    "cash"
  ],
  [
    "thin",
    "shin",
    "chin",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "dash",
    "rash",
    "cash",
    "mash",
    "math",
    "path"
  ],
  [
    "sick",
    "lick",
    "luck",
    "buck",
    "tuck",
    "tick"
  ],
  [
    "rash",
    "lash",
    "bash",
    "gash",
    "mash",
    "dash"
  ],
  [
    "hush",
    "rush",
    "rash",
    "gash",
    "mash",
    "bash"
  ],
  [
    "bash",
    "dash",
    "lash",
    "gash",
    "mash",
    "cash"
  ],
  [
    "path",
    "bath",
    "bash",
    "gash",
    "cash",
    "lash"
  ],
  [
    "puck",
    "suck",
    "sock",
    "lock",
    "dock",
    "rock"
  ],
  [
    "luck",
    "tuck",
    "tack",
    "tick",
    "lick",
    "sick"
  ],
  [
    "neck",
    "deck",
    "duck",
    "puck",
    "pick",
    "peck"
  ],
  [
    "neck",
    "deck",
    "dock",
    "lock",
    "rock",
    "sock"
  ],
  [
    "sick",
    "kick",
    "tick",
    "pick",
    "pack",
    "puck"
  ],
  [
    "wish",
    "dish",
    "dash",
    "mash",
    "lash",
    "rash"
  ],
  [
    "cash",
    "bash",
    "lash",
    "mash",
    "gash",
    "dash"
  ],
  [
    "math",
    "path",
    "bath",
    "bash",
    "mash",
    "rash"
  ],
  [
    "path",
    "bath",
    "bash",
    "rash",
    "mash",
    "math"
  ],
  [
    "pack",
    "puck",
    "duck",
    "suck",
    "sock",
    "rock"
  ],
  [
    "rash",
    "mash",
    "dash",
    "gash",
    "cash",
    "bash"
  ],
  [
    "kick",
    "tick",
    "tuck",
    "luck",
    "buck",
    "duck"
  ],
  [
    "tack",
    "back",
    "buck",
    "luck",
    "puck",
    "suck"
  ],
  [
    "tick",
    "sick",
    "sock",
    "dock",
    "deck",
    "peck"
  ],
  [
    "bath",
    "path",
    "math",
    "mash",
    "dash",
    "gash"
  ],
  [
    "rock",
    "sock",
    "lock",
    "luck",
    "buck",
    "back"
  ],
  [
    "suck",
    "sick",
    "lick",
    "pick",
    "kick",
    "tick"
  ],
  [
    "bash",
    "rash",
    "gash",
    "lash",
    "cash",
    "dash"
  ],
  [
    "pick",
    "tick",
    "lick",
    "lock",
    "sock",
    "sack"
  ],
  [
    "buck",
    "luck",
    "puck",
    "tuck",
    "suck",
    "duck"
  ],
  [
    "hush",
    "rush",
    "rash",
    "lash",
    "cash",
    "bash"
  ],
  [
    "hush",
    "rush",
    "rash",
    "mash",
    "lash",
    "gash"
  ],
  [
    "tuck",
    "luck",
    "puck",
    "buck",
    "suck",
    "sack"
  ],
  [
    "pack",
    "puck",
    "pick",
    "sick",
    "sack",
    "back"
  ],
  [
    "hush",
    "rush",
    "rash",
    "lash",
    "bash",
    "cash"
  ],
  [
    "puck",
    "duck",
    "tuck",
    "buck",
    "back",
    "tack"
  ],
  [
    "mash",
    "bash",
    "gash",
    "dash",
    "lash",
    "cash"
  ],
  [
    "rack",
    "tack",
    "pack",
    "back",
    "sack",
    "sick"
  ],
  [
    "sick",
    "sock",
    "dock",
    "deck",
    "duck",
    "buck"
  ],
  [
    "sock",
    "sack",
    "sick",
    "suck",
    "tuck",
    "tack"
  ],
  [
    "rack",
    "tack",
    "pack",
    "back",
    "buck",
    "duck"
  ],
  [
    "mash",
    "cash",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "rock",
    "rack",
    "pack",
    "peck",
    "puck",
    "luck"
  ],
  [
    "tack",
    "tuck",
    "tick",
    "sick",
    "sock",
    "rock"
  ],
  [
    "rack",
    "tack",
    "sack",
    "sock",
    "rock",
    "dock"
  ],
  [
    "tuck",
    "duck",
    "buck",
    "luck",
    "lock",
    "sock"
  ],
  [
    "lash",
    "cash",
    "mash",
    "gash",
    "rash",
    "dash"
  ],
  [
    "kick",
    "tick",
    "pick",
    "lick",
    "luck",
    "buck"
  ],
  [
    "rock",
    "dock",
    "deck",
    "duck",
    "puck",
    "peck"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "cash",
    "gash"
  ],
  [
    "path",
    "bath",
    "bash",
    "gash",
    "dash",
    "lash"
  ],
  [
    "mash",
    "cash",
    "dash",
    "bash",
    "gash",
    "rash"
  ],
  [
    "rash",
    "cash",
    "gash",
    "mash",
    "dash",
    "dish"
  ],
  [
    "sack",
    "suck",
    "duck",
    "puck",
    "pick",
    "peck"
  ],
  [
    "dash",
    "rash",
    "cash",
    "gash",
    "mash",
    "lash"
  ],
  [
    "sack",
    "rack",
    "tack",
    "pack",
    "back",
    "buck"
  ],
  [
    "pack",
    "tack",
    "rack",
    "sack",
    "suck",
    "duck"
  ],
  [
    "fish",
    "wish",
    "dish",
    "dash",
    "mash",
    "lash"
  ],
  [
    "gash",
    "dash",
    "rash",
    "lash",
    "mash",
    "math"
  ],
  [
    "kick",
    "pick",
    "pack",
    "rack",
    "rock",
    "lock"
  ],
  [
    "lash",
    "dash",
    "gash",
    "rash",
    "cash",
    "mash"
  ],
  [
    "math",
    "bath",
    "bash",
    "cash",
    "lash",
    "rash"
  ],
  [
    "rock",
    "lock",
    "dock",
    "duck",
    "suck",
    "sick"
  ],
  [
    "rash",
    "gash",
    "lash",
    "mash",
    "math",
    "moth"
  ],
  [
    "sack",
    "tack",
    "tick",
    "pick",
    "pack",
    "rack"
  ],
  [
    "bath",
    "bash",
    "lash",
    "dash",
    "gash",
    "rash"
  ],
  [
    "rock",
    "dock",
    "lock",
    "sock",
    "suck",
    "sack"
  ],
  [
    "rack",
    "rock",
    "lock",
    "luck",
    "duck",
    "tuck"
  ],
  [
    "deck",
    "neck",
    "peck",
    "pick",
    "pack",
    "rack"
  ],
  [
    "lock",
    "lick",
    "luck",
    "suck",
    "duck",
    "tuck"
  ],
  [
    "suck",
    "tuck",
    "luck",
    "buck",
    "duck",
    "deck"
  ],
  [
    "kick",
    "tick",
    "tack",
    "tuck",
    "buck",
    "luck"
  ],
  [
    "deck",
    "duck",
    "luck",
    "tuck",
    "buck",
    "puck"
  ],
  [
    "rock",
    "rack",
    "pack",
    "puck",
    "peck",
    "pick"
  ],
  [
    "dock",
    "lock",
    "sock",
    "suck",
    "duck",
    "puck"
  ],
  [
    "tack",
    "back",
    "rack",
    "sack",
    "suck",
    "sock"
  ],
  [
    "pick",
    "kick",
    "lick",
    "lock",
    "luck",
    "buck"
  ],
  [
    "tick",
    "kick",
    "lick",
    "luck",
    "buck",
    "suck"
  ],
  [
    "path",
    "bath",
    "bash",
    "gash",
    "rash",
    "cash"
  ],
  [
    "sock",
    "dock",
    "lock",
    "rock",
    "rack",
    "pack"
  ],
  [
    "duck",
    "buck",
    "luck",
    "tuck",
    "tick",
    "sick"
  ],
  [
    "dash",
    "rash",
    "cash",
    "lash",
    "gash",
    "mash"
  ],
  [
    "duck",
    "puck",
    "pick",
    "pack",
    "tack",
    "rack"
  ],
  [
    "tick",
    "sick",
    "sack",
    "suck",
    "buck",
    "back"
  ],
  [
    "path",
    "math",
    "mash",
    "rash",
    "rush",
    "hush"
  ],
  [
    "gash",
    "lash",
    "cash",
    "dash",
    "rash",
    "mash"
  ],
  [
    "duck",
    "dock",
    "rock",
    "sock",
    "lock",
    "lick"
  ],
  [
    "tuck",
    "puck",
    "suck",
    "sick",
    "kick",
    "pick"
  ],
  [
    "sick",
    "lick",
    "luck",
    "duck",
    "suck",
    "buck"
  ],
  [
    "suck",
    "buck",
    "back",
    "tack",
    "tick",
    "pick"
  ],
  [
    "buck",
    "back",
    "sack",
    "pack",
    "pick",
    "peck"
  ],
  [
    "suck",
    "tuck",
    "puck",
    "buck",
    "back",
    "rack"
  ],
  [
    "bash",
    "lash",
    "cash",
    "gash",
    "mash",
    "dash"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chin",
    "shin",
    "thin"
  ],
  [
    "dock",
    "rock",
    "rack",
    "pack",
    "peck",
    "deck"
  ],
  [
    "puck",
    "tuck",
    "buck",
    "back",
    "pack",
    "sack"
  ],
  [
    "mash",
    "dash",
    "cash",
    "gash",
    "bash",
    "bath"
  ],
  [
    "fish",
    "dish",
    "dash",
    "lash",
    "rash",
    "bash"
  ],
  [
    "hush",
    "rush",
    "rash",
    "gash",
    "bash",
    "cash"
  ],
  [
    "lash",
    "bash",
    "dash",
    "gash",
    "cash",
    "mash"
  ],
  [
    "lick",
    "kick",
    "tick",
    "tack",
    "tuck",
    "luck"
  ],
  [
    "cash",
    "bash",
    "dash",
    "mash",
    "math",
    "path"
  ],
  [
    "tuck",
    "buck",
    "suck",
    "sick",
    "lick",
    "luck"
  ],
  [
    "rack",
    "pack",
    "tack",
    "tick",
    "sick",
    "kick"
  ],
  [
    "rack",
    "back",
    "tack",
    "tuck",
    "suck",
    "sick"
  ],
  [
    "lock",
    "sock",
    "suck",
    "sick",
    "kick",
    "lick"
  ],
  [
    "bash",
    "lash",
    "cash",
    "mash",
    "gash",
    "rash"
  ],
  [
    "mash",
    "lash",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "tuck",
    "luck",
    "duck",
    "deck",
    "neck",
    "peck"
  ],
  [
    "buck",
    "duck",
    "tuck",
    "tick",
    "sick",
    "suck"
  ],
  [
    "rack",
    "pack",
    "pick",
    "peck",
    "puck",
    "buck"
  ],
  [
    "lock",
    "luck",
    "lick",
    "pick",
    "pack",
    "sack"
  ],
  [
    "dish",
    "dash",
    "cash",
    "bash",
    "gash",
    "rash"
  ],
  [
    "kick",
    "pick",
    "sick",
    "lick",
    "luck",
    "tuck"
  ],
  [
    "suck",
    "sack",
    "pack",
    "tack",
    "rack",
    "back"
  ],
  [
    "neck",
    "peck",
    "deck",
    "duck",
    "puck",
    "pick"
  ],
  [
    "dock",
    "rock",
    "lock",
    "luck",
    "puck",
    "tuck"
  ],
  [
    "gash",
    "dash",
    "lash",
    "rash",
    "mash",
    "cash"
  ],
  [
    "deck",
    "peck",
    "pack",
    "pick",
    "lick",
    "kick"
  ],
  [
    "back",
    "tack",
    "sack",
    "sock",
    "sick",
    "suck"
  ],
  [
    "sack",
    "sick",
    "sock",
    "rock",
    "rack",
    "tack"
  ],
  [
    "duck",
    "deck",
    "neck",
    "peck",
    "puck",
    "pack"
  ],
  [
    "tick",
    "tuck",
    "tack",
    "rack",
    "back",
    "sack"
  ],
  [
    "sock",
    "suck",
    "duck",
    "dock",
    "deck",
    "neck"
  ],
  [
    "back",
    "buck",
    "duck",
    "tuck",
    "tack",
    "tick"
  ],
  [
    "puck",
    "suck",
    "tuck",
    "buck",
    "back",
    "sack"
  ],
    [
    "back",
    "bash",
    "bath",
    "math",
    "mash",
    "cash"
  ],
  [
    "back",
    "bash",
    "bath",
    "math",
    "mash",
    "dash"
  ],
  [
    "back",
    "bash",
    "bath",
    "math",
    "mash",
    "gash"
  ],
  [
    "back",
    "bash",
    "bath",
    "math",
    "mash",
    "lash"
  ],
  [
    "back",
    "bash",
    "bath",
    "math",
    "mash",
    "rash"
  ],
  [
    "back",
    "bash",
    "bath",
    "math",
    "path",
    "pack"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "mash",
    "cash"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "mash",
    "dash"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "mash",
    "gash"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "mash",
    "lash"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "mash",
    "rash"
  ],
  [
    "bash",
    "back",
    "bath",
    "math",
    "path",
    "pack"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "dash",
    "gash"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "dash",
    "lash"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "dash",
    "mash"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "dash",
    "rash"
  ],
  [
    "bath",
    "back",
    "bash",
    "cash",
    "gash",
    "dash"
  ],
  [
    "buck",
    "back",
    "bash",
    "bath",
    "math",
    "mash"
  ],
  [
    "buck",
    "back",
    "bash",
    "bath",
    "math",
    "moth"
  ],
  [
    "buck",
    "back",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "buck",
    "back",
    "bash",
    "bath",
    "path",
    "math"
  ],
  [
    "buck",
    "back",
    "bash",
    "bath",
    "path",
    "pack"
  ],
  [
    "buck",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "cash",
    "bash",
    "back",
    "bath",
    "math",
    "mash"
  ],
  [
    "cash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "cash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "cash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "cash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "cash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "check",
    "chick",
    "quick",
    "quack",
    "shack",
    "shock"
  ],
  [
    "check",
    "chick",
    "quick",
    "quack",
    "shack",
    "whack"
  ],
  [
    "check",
    "chick",
    "quick",
    "quack",
    "whack",
    "shack"
  ],
  [
    "check",
    "chuck",
    "chick",
    "quick",
    "quack",
    "shack"
  ],
  [
    "check",
    "chuck",
    "chick",
    "quick",
    "quack",
    "whack"
  ],
  [
    "chick",
    "quick",
    "quack",
    "whack",
    "shack",
    "shock"
  ],
  [
    "chill",
    "chick",
    "quick",
    "quack",
    "shack",
    "shock"
  ],
  [
    "chill",
    "chick",
    "quick",
    "quack",
    "shack",
    "whack"
  ],
  [
    "chill",
    "chick",
    "quick",
    "quack",
    "whack",
    "shack"
  ],
  [
    "chin",
    "chip",
    "chop",
    "shop",
    "shot",
    "shut"
  ],
  [
    "chuck",
    "check",
    "chick",
    "quick",
    "quack",
    "shack"
  ],
  [
    "chuck",
    "check",
    "chick",
    "quick",
    "quack",
    "whack"
  ],
  [
    "chuck",
    "chick",
    "quick",
    "quack",
    "shack",
    "shock"
  ],
  [
    "chuck",
    "chick",
    "quick",
    "quack",
    "shack",
    "whack"
  ],
  [
    "chuck",
    "chick",
    "quick",
    "quack",
    "whack",
    "shack"
  ],
  [
    "dash",
    "bash",
    "back",
    "bath",
    "math",
    "mash"
  ],
  [
    "dash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "dash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "dash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "dash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "dash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "deck",
    "dock",
    "duck",
    "buck",
    "back",
    "bash"
  ],
  [
    "deck",
    "dock",
    "duck",
    "buck",
    "back",
    "bath"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "bath",
    "math"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "bath",
    "path"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "buck",
    "duck"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "buck",
    "luck"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "buck",
    "puck"
  ],
  [
    "dish",
    "dash",
    "bash",
    "back",
    "buck",
    "suck"
  ],
  [
    "dock",
    "deck",
    "duck",
    "buck",
    "back",
    "bash"
  ],
  [
    "dock",
    "deck",
    "duck",
    "buck",
    "back",
    "bath"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "bath",
    "math"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "bath",
    "path"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "duck",
    "buck",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "bath"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "buck"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "pack"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "rack"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "sack"
  ],
  [
    "fish",
    "dish",
    "dash",
    "bash",
    "back",
    "tack"
  ],
  [
    "gash",
    "bash",
    "back",
    "bath",
    "math",
    "mash"
  ],
  [
    "gash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "gash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "gash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "gash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "gash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "bath"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "buck"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "pack"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "rack"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "sack"
  ],
  [
    "hush",
    "rush",
    "rash",
    "bash",
    "back",
    "tack"
  ],
  [
    "lash",
    "bash",
    "back",
    "bath",
    "math",
    "mash"
  ],
  [
    "lash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "lash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "lash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "lash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "lash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "lick",
    "kick",
    "pick",
    "pack",
    "back",
    "bash"
  ],
  [
    "lick",
    "kick",
    "pick",
    "pack",
    "back",
    "bath"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "bath",
    "math"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "bath",
    "path"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "luck",
    "buck",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "mash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "mash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "mash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "mash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "mash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "mash",
    "bash",
    "back",
    "buck",
    "duck",
    "dock"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "cash",
    "rash"
  ],
  [
    "math",
    "bath",
    "back",
    "bash",
    "dash",
    "cash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "cash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "dash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "gash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "lash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "mash"
  ],
  [
    "moth",
    "math",
    "bath",
    "back",
    "bash",
    "rash"
  ],
  [
    "pack",
    "back",
    "bash",
    "bath",
    "math",
    "mash"
  ],
  [
    "pack",
    "back",
    "bash",
    "bath",
    "math",
    "moth"
  ],
  [
    "pack",
    "back",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "pack",
    "back",
    "bash",
    "bath",
    "path",
    "math"
  ],
  [
    "pack",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "pack",
    "back",
    "bash",
    "cash",
    "dash",
    "gash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "cash",
    "rash"
  ],
  [
    "path",
    "bath",
    "back",
    "bash",
    "dash",
    "cash"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "bath",
    "math"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "bath",
    "path"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "puck",
    "buck",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "rack",
    "back",
    "bash",
    "bath",
    "math",
    "mash"
  ],
  [
    "rack",
    "back",
    "bash",
    "bath",
    "math",
    "moth"
  ],
  [
    "rack",
    "back",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "rack",
    "back",
    "bash",
    "bath",
    "path",
    "math"
  ],
  [
    "rack",
    "back",
    "bash",
    "bath",
    "path",
    "pack"
  ],
  [
    "rack",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "rash",
    "bash",
    "back",
    "bath",
    "math",
    "mash"
  ],
  [
    "rash",
    "bash",
    "back",
    "bath",
    "math",
    "moth"
  ],
  [
    "rash",
    "bash",
    "back",
    "bath",
    "math",
    "path"
  ],
  [
    "rash",
    "bash",
    "back",
    "bath",
    "path",
    "math"
  ],
  [
    "rash",
    "bash",
    "back",
    "bath",
    "path",
    "pack"
  ],
  [
    "rash",
    "bash",
    "back",
    "buck",
    "duck",
    "deck"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "bath",
    "math"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "bath",
    "path"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "buck",
    "duck"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "buck",
    "luck"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "buck",
    "puck"
  ],
  [
    "rush",
    "rash",
    "bash",
    "back",
    "buck",
    "suck"
  ],
  [
    "sack",
    "back",
    "bash",
    "bath",
    "math",
    "mash"
  ],
  [
    "sack",
    "back",
    "bash",
    "bath",
    "math",
    "moth"
  ],
  [
    "sack",
    "back",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "sack",
    "back",
    "bash",
    "bath",
    "path",
    "math"
  ],
  [
    "sack",
    "back",
    "bash",
    "bath",
    "path",
    "pack"
  ],
  [
    "sack",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "shack",
    "quack",
    "quick",
    "chick",
    "check",
    "chuck"
  ],
  [
    "shack",
    "quack",
    "quick",
    "chick",
    "chuck",
    "check"
  ],
  [
    "shack",
    "whack",
    "quack",
    "quick",
    "chick",
    "check"
  ],
  [
    "shack",
    "whack",
    "quack",
    "quick",
    "chick",
    "chill"
  ],
  [
    "shack",
    "whack",
    "quack",
    "quick",
    "chick",
    "chuck"
  ],
  [
    "shin",
    "chin",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "shin",
    "thin",
    "chin",
    "chip",
    "chop",
    "shop"
  ],
  [
    "shin",
    "thin",
    "chin",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "shock",
    "shack",
    "quack",
    "quick",
    "chick",
    "check"
  ],
  [
    "shock",
    "shack",
    "quack",
    "quick",
    "chick",
    "chill"
  ],
  [
    "shock",
    "shack",
    "quack",
    "quick",
    "chick",
    "chuck"
  ],
  [
    "shock",
    "shack",
    "whack",
    "quack",
    "quick",
    "chick"
  ],
  [
    "shop",
    "chop",
    "chip",
    "chin",
    "shin",
    "thin"
  ],
  [
    "shop",
    "chop",
    "chip",
    "chin",
    "thin",
    "shin"
  ],
  [
    "shot",
    "shop",
    "chop",
    "chip",
    "chin",
    "shin"
  ],
  [
    "shot",
    "shop",
    "chop",
    "chip",
    "chin",
    "thin"
  ],
  [
    "shot",
    "shop",
    "chop",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "shut",
    "shot",
    "shop",
    "chop",
    "chip",
    "chin"
  ],
  [
    "shut",
    "shot",
    "shop",
    "chop",
    "chip",
    "whip"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "bath",
    "math"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "bath",
    "path"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "suck",
    "buck",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "tack",
    "back",
    "bash",
    "bath",
    "math",
    "mash"
  ],
  [
    "tack",
    "back",
    "bash",
    "bath",
    "math",
    "moth"
  ],
  [
    "tack",
    "back",
    "bash",
    "bath",
    "math",
    "path"
  ],
  [
    "tack",
    "back",
    "bash",
    "bath",
    "path",
    "math"
  ],
  [
    "tack",
    "back",
    "bash",
    "bath",
    "path",
    "pack"
  ],
  [
    "tack",
    "back",
    "bash",
    "cash",
    "dash",
    "dish"
  ],
  [
    "thin",
    "chin",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "thin",
    "shin",
    "chin",
    "chip",
    "chop",
    "shop"
  ],
  [
    "thin",
    "shin",
    "chin",
    "chip",
    "whip",
    "whiz"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "bath",
    "math"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "bath",
    "path"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "cash",
    "dash"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "cash",
    "gash"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "cash",
    "lash"
  ],
  [
    "tuck",
    "buck",
    "back",
    "bash",
    "cash",
    "mash"
  ],
  [
    "whack",
    "quack",
    "quick",
    "chick",
    "check",
    "chuck"
  ],
  [
    "whack",
    "quack",
    "quick",
    "chick",
    "chuck",
    "check"
  ],
  [
    "whack",
    "shack",
    "quack",
    "quick",
    "chick",
    "check"
  ],
  [
    "whack",
    "shack",
    "quack",
    "quick",
    "chick",
    "chill"
  ],
  [
    "whack",
    "shack",
    "quack",
    "quick",
    "chick",
    "chuck"
  ],
  [
    "whip",
    "chip",
    "chop",
    "shop",
    "shot",
    "shut"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chin",
    "shin",
    "thin"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chin",
    "thin",
    "shin"
  ],
  [
    "whiz",
    "whip",
    "chip",
    "chop",
    "shop",
    "shot"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "bath"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "buck"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "pack"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "rack"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "sack"
  ],
  [
    "wish",
    "dish",
    "dash",
    "bash",
    "back",
    "tack"
  ]
];

// Ladders that include ≥1 blend/digraph detailed word
const digraphBlendLadders = [
  ["ash", "gash", "bash", "rash", "rush", "crush"],
  ["ash", "gash", "cash", "bash", "lash", "clash"],
  ["ash", "gash", "cash", "bash", "lash", "flash"],
  ["ash", "gash", "cash", "bash", "lash", "slash"],
  ["ash", "gash", "cash", "bash", "mash", "smash"],
  ["ash", "gash", "cash", "bash", "rash", "crash"],
  ["back", "rack", "sack", "shack", "stack", "snack"],
  ["back", "rack", "sack", "shack", "stack", "stick"],
  ["back", "rack", "sack", "shack", "stack", "stuck"],
  ["back", "rack", "sack", "shack", "stack", "tack"],
  ["back", "rack", "sack", "sick", "lick", "click"],
  ["back", "rack", "sack", "sick", "lick", "flick"],
  ["bash", "gash", "ash", "mash", "cash", "clash"],
  ["bash", "gash", "ash", "mash", "cash", "crash"],
  ["bash", "gash", "ash", "mash", "lash", "clash"],
  ["bash", "gash", "ash", "mash", "lash", "flash"],
  ["bash", "gash", "ash", "mash", "lash", "slash"],
  ["bash", "gash", "ash", "mash", "rash", "crash"],
  ["bath", "path", "math", "mash", "cash", "crash"],
  ["bath", "path", "math", "mash", "lash", "clash"],
  ["bath", "path", "math", "mash", "lash", "flash"],
  ["bath", "path", "math", "mash", "lash", "slash"],
  ["bath", "path", "math", "mash", "rash", "crash"],
  ["bath", "path", "math", "mash", "smash", "slash"],
  ["black", "back", "tack", "tick", "lick", "kick"],
  ["black", "back", "tack", "tick", "lick", "lock"],
  ["black", "back", "tack", "tick", "lick", "luck"],
  ["black", "back", "tack", "tick", "lick", "pick"],
  ["black", "back", "tack", "tick", "lick", "sick"],
  ["black", "back", "tack", "tick", "lick", "slick"],
  ["block", "lock", "dock", "duck", "puck", "pack"],
  ["block", "lock", "dock", "duck", "puck", "peck"],
  ["block", "lock", "dock", "duck", "puck", "pick"],
  ["block", "lock", "dock", "duck", "puck", "pluck"],
  ["block", "lock", "dock", "duck", "puck", "suck"],
  ["block", "lock", "dock", "duck", "puck", "tuck"],
  ["blush", "plush", "flush", "flash", "lash", "mash"],
  ["blush", "plush", "flush", "flash", "lash", "rash"],
  ["blush", "plush", "flush", "flash", "lash", "slash"],
  ["blush", "plush", "flush", "flash", "slash", "clash"],
  ["blush", "plush", "flush", "flash", "slash", "lash"],
  ["blush", "plush", "flush", "flash", "slash", "smash"],
  ["brick", "trick", "truck", "tuck", "tick", "kick"],
  ["brick", "trick", "truck", "tuck", "tick", "lick"],
  ["brick", "trick", "truck", "tuck", "tick", "pick"],
  ["brick", "trick", "truck", "tuck", "tick", "sick"],
  ["brick", "trick", "truck", "tuck", "tick", "stick"],
  ["brick", "trick", "truck", "tuck", "tick", "tack"],
  ["brush", "rush", "rash", "mash", "lash", "gash"],
  ["brush", "rush", "rash", "mash", "lash", "slash"],
  ["brush", "rush", "rash", "mash", "math", "bath"],
  ["brush", "rush", "rash", "mash", "math", "moth"],
  ["brush", "rush", "rash", "mash", "math", "path"],
  ["brush", "rush", "rash", "mash", "smash", "slash"],
  ["buck", "luck", "lock", "lick", "slick", "flick"],
  ["buck", "luck", "lock", "lick", "slick", "sick"],
  ["buck", "luck", "lock", "lick", "slick", "stick"],
  ["buck", "luck", "lock", "lick", "tick", "stick"],
  ["buck", "luck", "lock", "lick", "tick", "trick"],
  ["buck", "luck", "lock", "rock", "rack", "crack"],
  ["cash", "crash", "rash", "mash", "dash", "ash"],
  ["cash", "crash", "rash", "mash", "dash", "bash"],
  ["cash", "crash", "rash", "mash", "dash", "dish"],
  ["cash", "crash", "rash", "mash", "dash", "gash"],
  ["cash", "crash", "rash", "mash", "dash", "lash"],
  ["cash", "crash", "rash", "mash", "gash", "ash"],
  ["check", "chuck", "cluck", "pluck", "puck", "luck"],
  ["check", "chuck", "cluck", "pluck", "puck", "pack"],
  ["check", "chuck", "cluck", "pluck", "puck", "peck"],
  ["check", "chuck", "cluck", "pluck", "puck", "pick"],
  ["check", "chuck", "cluck", "pluck", "puck", "suck"],
  ["check", "chuck", "cluck", "pluck", "puck", "tuck"],
  ["chick", "click", "slick", "stick", "tick", "lick"],
  ["chick", "click", "slick", "stick", "tick", "pick"],
  ["chick", "click", "slick", "stick", "tick", "sick"],
  ["chick", "click", "slick", "stick", "tick", "tack"],
  ["chick", "click", "slick", "stick", "tick", "trick"],
  ["chick", "click", "slick", "stick", "tick", "tuck"],
  ["chimp", "chip", "chop", "shop", "shot", "shut"],
  ["chimp", "chomp", "chop", "chip", "chin", "shin"],
  ["chimp", "chomp", "chop", "chip", "chin", "thin"],
  ["chimp", "chomp", "chop", "chip", "whip", "whiz"],
  ["chimp", "chomp", "chop", "shop", "shot", "shut"],
  ["chin", "chip", "chimp", "chomp", "chop", "shop"],
  ["chip", "chimp", "chomp", "chop", "shop", "shot"],
  ["chomp", "chimp", "chip", "chin", "shin", "thin"],
  ["chomp", "chimp", "chip", "chin", "thin", "shin"],
  ["chomp", "chimp", "chip", "chop", "shop", "shot"],
  ["chomp", "chop", "chip", "chin", "shin", "thin"],
  ["chomp", "chop", "chip", "chin", "thin", "shin"],
  ["chop", "chomp", "chimp", "chip", "chin", "shin"],
  ["chop", "chomp", "chimp", "chip", "chin", "thin"],
  ["chop", "chomp", "chimp", "chip", "whip", "whiz"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "luck"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "stuck"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "suck"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "tack"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "tick"],
  ["chuck", "cluck", "pluck", "puck", "tuck", "truck"],
  ["clash", "cash", "lash", "rash", "gash", "dash"],
  ["clash", "cash", "lash", "rash", "gash", "mash"],
  ["clash", "cash", "lash", "rash", "mash", "ash"],
  ["clash", "cash", "lash", "rash", "mash", "bash"],
  ["clash", "cash", "lash", "rash", "mash", "dash"],
  ["clash", "cash", "lash", "rash", "mash", "gash"],
  ["click", "flick", "lick", "pick", "pack", "sack"],
  ["click", "flick", "lick", "pick", "pack", "tack"],
  ["click", "flick", "lick", "pick", "peck", "deck"],
  ["click", "flick", "lick", "pick", "peck", "neck"],
  ["click", "flick", "lick", "pick", "peck", "pack"],
  ["click", "flick", "lick", "pick", "peck", "puck"],
  ["clock", "cluck", "luck", "lick", "slick", "flick"],
  ["clock", "cluck", "luck", "lick", "slick", "sick"],
  ["clock", "cluck", "luck", "lick", "slick", "stick"],
  ["clock", "cluck", "luck", "lick", "tick", "kick"],
  ["clock", "cluck", "luck", "lick", "tick", "pick"],
  ["clock", "cluck", "luck", "lick", "tick", "sick"],
  ["cluck", "luck", "buck", "puck", "peck", "pick"],
  ["cluck", "luck", "buck", "puck", "peck", "speck"],
  ["cluck", "luck", "buck", "puck", "pick", "kick"],
  ["cluck", "luck", "buck", "puck", "pick", "lick"],
  ["cluck", "luck", "buck", "puck", "pick", "pack"],
  ["cluck", "luck", "buck", "puck", "pick", "peck"],
  ["crack", "rack", "tack", "track", "trick", "tick"],
  ["crack", "rack", "tack", "track", "trick", "truck"],
  ["crack", "rack", "tack", "track", "truck", "trick"],
  ["crack", "rack", "tack", "track", "truck", "tuck"],
  ["crack", "rack", "tack", "tuck", "buck", "back"],
  ["crack", "rack", "tack", "tuck", "buck", "duck"],
  ["crash", "cash", "lash", "gash", "dash", "bash"],
  ["crash", "cash", "lash", "gash", "dash", "dish"],
  ["crash", "cash", "lash", "gash", "dash", "mash"],
  ["crash", "cash", "lash", "gash", "dash", "rash"],
  ["crash", "cash", "lash", "gash", "mash", "ash"],
  ["crash", "cash", "lash", "gash", "mash", "bash"],
  ["crush", "rush", "rash", "cash", "lash", "ash"],
  ["crush", "rush", "rash", "cash", "lash", "bash"],
  ["crush", "rush", "rash", "cash", "lash", "clash"],
  ["crush", "rush", "rash", "cash", "lash", "dash"],
  ["crush", "rush", "rash", "cash", "lash", "flash"],
  ["crush", "rush", "rash", "cash", "lash", "gash"],
  ["dash", "cash", "lash", "flash", "clash", "slash"],
  ["dash", "cash", "lash", "flash", "flush", "blush"],
  ["dash", "cash", "lash", "flash", "flush", "plush"],
  ["dash", "cash", "lash", "flash", "slash", "clash"],
  ["dash", "cash", "lash", "flash", "slash", "smash"],
  ["dash", "cash", "lash", "gash", "mash", "smash"],
  ["deck", "peck", "pick", "sick", "lick", "click"],
  ["deck", "peck", "pick", "sick", "lick", "flick"],
  ["deck", "peck", "pick", "sick", "lick", "slick"],
  ["deck", "peck", "pick", "sick", "sack", "smack"],
  ["deck", "peck", "pick", "sick", "sack", "snack"],
  ["deck", "peck", "pick", "sick", "sack", "stack"],
  ["dish", "dash", "rash", "mash", "lash", "slash"],
  ["dish", "dash", "rash", "mash", "smash", "slash"],
  ["dish", "dash", "rash", "rush", "brush", "blush"],
  ["dish", "dash", "rash", "rush", "brush", "crush"],
  ["dish", "dash", "rash", "rush", "crush", "brush"],
  ["dish", "dash", "rash", "rush", "crush", "crash"],
  ["dock", "lock", "sock", "suck", "tuck", "truck"],
  ["dock", "rock", "lock", "block", "black", "back"],
  ["dock", "rock", "lock", "block", "clock", "click"],
  ["dock", "rock", "lock", "block", "clock", "cluck"],
  ["dock", "rock", "lock", "block", "clock", "flock"],
  ["dock", "rock", "lock", "block", "flock", "clock"],
  ["duck", "luck", "lock", "clock", "click", "lick"],
  ["duck", "luck", "lock", "clock", "click", "slick"],
  ["duck", "luck", "lock", "clock", "cluck", "chuck"],
  ["duck", "luck", "lock", "clock", "cluck", "click"],
  ["duck", "luck", "lock", "clock", "cluck", "pluck"],
  ["duck", "luck", "lock", "clock", "flock", "block"],
  ["fish", "wish", "dish", "dash", "cash", "crash"],
  ["fish", "wish", "dish", "dash", "lash", "clash"],
  ["fish", "wish", "dish", "dash", "lash", "flash"],
  ["fish", "wish", "dish", "dash", "lash", "slash"],
  ["fish", "wish", "dish", "dash", "mash", "smash"],
  ["fish", "wish", "dish", "dash", "rash", "crash"],
  ["flash", "lash", "ash", "gash", "mash", "math"],
  ["flash", "lash", "ash", "gash", "mash", "rash"],
  ["flash", "lash", "ash", "gash", "mash", "smash"],
  ["flash", "lash", "ash", "gash", "rash", "bash"],
  ["flash", "lash", "ash", "gash", "rash", "cash"],
  ["flash", "lash", "ash", "gash", "rash", "crash"],
  ["flick", "lick", "kick", "pick", "sick", "stick"],
  ["flick", "lick", "kick", "pick", "sick", "suck"],
  ["flick", "lick", "kick", "pick", "sick", "tick"],
  ["flick", "lick", "kick", "pick", "tick", "sick"],
  ["flick", "lick", "kick", "pick", "tick", "stick"],
  ["flick", "lick", "kick", "pick", "tick", "tack"],
  ["flock", "flick", "lick", "luck", "tuck", "duck"],
  ["flock", "flick", "lick", "luck", "tuck", "puck"],
  ["flock", "flick", "lick", "luck", "tuck", "stuck"],
  ["flock", "flick", "lick", "luck", "tuck", "suck"],
  ["flock", "flick", "lick", "luck", "tuck", "tack"],
  ["flock", "flick", "lick", "luck", "tuck", "tick"],
  ["flush", "flash", "slash", "smash", "mash", "rash"],
  ["flush", "plush", "blush", "brush", "crush", "crash"],
  ["flush", "plush", "blush", "brush", "crush", "rush"],
  ["flush", "plush", "blush", "brush", "rush", "crush"],
  ["flush", "plush", "blush", "brush", "rush", "hush"],
  ["flush", "plush", "blush", "brush", "rush", "rash"],
  ["gash", "cash", "crash", "rash", "dash", "dish"],
  ["gash", "cash", "crash", "rash", "dash", "lash"],
  ["gash", "cash", "crash", "rash", "dash", "mash"],
  ["gash", "cash", "crash", "rash", "lash", "ash"],
  ["gash", "cash", "crash", "rash", "lash", "bash"],
  ["gash", "cash", "crash", "rash", "lash", "clash"],
  ["hush", "rush", "rash", "mash", "cash", "clash"],
  ["hush", "rush", "rash", "mash", "cash", "crash"],
  ["hush", "rush", "rash", "mash", "lash", "clash"],
  ["hush", "rush", "rash", "mash", "lash", "flash"],
  ["hush", "rush", "rash", "mash", "lash", "slash"],
  ["hush", "rush", "rash", "mash", "smash", "slash"],
  ["kick", "pick", "sick", "sock", "lock", "block"],
  ["kick", "pick", "sick", "sock", "lock", "clock"],
  ["kick", "pick", "sick", "sock", "lock", "flock"],
  ["kick", "pick", "sick", "sock", "sack", "smack"],
  ["kick", "pick", "sick", "sock", "sack", "snack"],
  ["kick", "pick", "sick", "sock", "sack", "stack"],
  ["lash", "dash", "bash", "rash", "cash", "crash"],
  ["lash", "dash", "bash", "rash", "crash", "cash"],
  ["lash", "dash", "bash", "rash", "crash", "clash"],
  ["lash", "dash", "bash", "rash", "crash", "crush"],
  ["lash", "dash", "bash", "rash", "mash", "smash"],
  ["lash", "dash", "bash", "rash", "rush", "brush"],
  ["lick", "lock", "sock", "sick", "slick", "flick"],
  ["lick", "lock", "sock", "sick", "slick", "stick"],
  ["lick", "lock", "sock", "sick", "stick", "slick"],
  ["lick", "lock", "sock", "sick", "stick", "stack"],
  ["lick", "lock", "sock", "sick", "stick", "stuck"],
  ["lick", "lock", "sock", "sick", "stick", "tick"],
  ["lock", "lick", "sick", "pick", "tick", "trick"],
  ["lock", "lick", "sick", "sack", "back", "black"],
  ["lock", "lick", "sick", "sack", "rack", "crack"],
  ["lock", "lick", "sick", "sack", "rack", "track"],
  ["lock", "lick", "sick", "sack", "shack", "smack"],
  ["lock", "lick", "sick", "sack", "shack", "snack"],
  ["luck", "lick", "click", "clock", "cluck", "chuck"],
  ["luck", "lick", "click", "clock", "cluck", "pluck"],
  ["luck", "lick", "click", "clock", "flock", "block"],
  ["luck", "lick", "click", "clock", "flock", "flick"],
  ["luck", "lick", "click", "clock", "flock", "lock"],
  ["luck", "lick", "click", "clock", "lock", "block"],
  ["mash", "cash", "dash", "lash", "clash", "crash"],
  ["mash", "cash", "dash", "lash", "clash", "flash"],
  ["mash", "cash", "dash", "lash", "clash", "slash"],
  ["mash", "cash", "dash", "lash", "flash", "clash"],
  ["mash", "cash", "dash", "lash", "flash", "flush"],
  ["mash", "cash", "dash", "lash", "flash", "slash"],
  ["math", "path", "bath", "bash", "cash", "crash"],
  ["math", "path", "bath", "bash", "lash", "clash"],
  ["math", "path", "bath", "bash", "lash", "flash"],
  ["math", "path", "bath", "bash", "lash", "slash"],
  ["math", "path", "bath", "bash", "mash", "smash"],
  ["math", "path", "bath", "bash", "rash", "crash"],
  ["moth", "math", "mash", "rash", "lash", "slash"],
  ["moth", "math", "mash", "rash", "rush", "brush"],
  ["moth", "math", "mash", "rash", "rush", "crush"],
  ["moth", "math", "mash", "smash", "slash", "clash"],
  ["moth", "math", "mash", "smash", "slash", "flash"],
  ["moth", "math", "mash", "smash", "slash", "lash"],
  ["neck", "peck", "puck", "tuck", "tack", "stack"],
  ["neck", "peck", "puck", "tuck", "tack", "track"],
  ["neck", "peck", "puck", "tuck", "tick", "stick"],
  ["neck", "peck", "puck", "tuck", "tick", "trick"],
  ["neck", "peck", "puck", "tuck", "truck", "track"],
  ["neck", "peck", "puck", "tuck", "truck", "trick"],
  ["pack", "pick", "sick", "sack", "snack", "shack"],
  ["pack", "pick", "sick", "sack", "snack", "smack"],
  ["pack", "pick", "sick", "sack", "snack", "stack"],
  ["pack", "pick", "sick", "sack", "sock", "smock"],
  ["pack", "pick", "sick", "sack", "stack", "shack"],
  ["pack", "pick", "sick", "sack", "stack", "smack"],
  ["path", "math", "mash", "rash", "lash", "slash"],
  ["path", "math", "mash", "rash", "rush", "brush"],
  ["path", "math", "mash", "rash", "rush", "crush"],
  ["path", "math", "mash", "smash", "slash", "clash"],
  ["path", "math", "mash", "smash", "slash", "flash"],
  ["path", "math", "mash", "smash", "slash", "lash"],
  ["peck", "pick", "lick", "sick", "tick", "trick"],
  ["peck", "pick", "lick", "slick", "click", "chick"],
  ["peck", "pick", "lick", "slick", "click", "clock"],
  ["peck", "pick", "lick", "slick", "click", "cluck"],
  ["peck", "pick", "lick", "slick", "click", "flick"],
  ["peck", "pick", "lick", "slick", "flick", "click"],
  ["pick", "lick", "tick", "tack", "stack", "stuck"],
  ["pick", "lick", "tick", "tack", "track", "crack"],
  ["pick", "lick", "tick", "tack", "track", "rack"],
  ["pick", "lick", "tick", "tack", "track", "trick"],
  ["pick", "lick", "tick", "tack", "track", "truck"],
  ["pick", "lick", "tick", "tack", "tuck", "stuck"],
  ["pluck", "luck", "duck", "puck", "suck", "stuck"],
  ["pluck", "luck", "duck", "puck", "suck", "tuck"],
  ["pluck", "luck", "duck", "puck", "tuck", "buck"],
  ["pluck", "luck", "duck", "puck", "tuck", "stuck"],
  ["pluck", "luck", "duck", "puck", "tuck", "suck"],
  ["pluck", "luck", "duck", "puck", "tuck", "tack"],
  ["plush", "flush", "flash", "slash", "lash", "clash"],
  ["plush", "flush", "flash", "slash", "lash", "dash"],
  ["plush", "flush", "flash", "slash", "lash", "gash"],
  ["plush", "flush", "flash", "slash", "lash", "mash"],
  ["plush", "flush", "flash", "slash", "lash", "rash"],
  ["plush", "flush", "flash", "slash", "smash", "mash"],
  ["puck", "luck", "buck", "back", "sack", "stack"],
  ["puck", "luck", "buck", "back", "tack", "stack"],
  ["puck", "luck", "buck", "back", "tack", "track"],
  ["puck", "luck", "buck", "duck", "suck", "stuck"],
  ["puck", "luck", "buck", "duck", "tuck", "stuck"],
  ["puck", "luck", "buck", "duck", "tuck", "truck"],
  ["rack", "pack", "tack", "sack", "shack", "smack"],
  ["rack", "pack", "tack", "sack", "shack", "snack"],
  ["rack", "pack", "tack", "sack", "shack", "stack"],
  ["rack", "pack", "tack", "sack", "sick", "slick"],
  ["rack", "pack", "tack", "sack", "sick", "stick"],
  ["rack", "pack", "tack", "sack", "smack", "shack"],
  ["rash", "cash", "lash", "flash", "clash", "slash"],
  ["rash", "cash", "lash", "flash", "flush", "blush"],
  ["rash", "cash", "lash", "flash", "flush", "plush"],
  ["rash", "cash", "lash", "flash", "slash", "clash"],
  ["rash", "cash", "lash", "flash", "slash", "smash"],
  ["rash", "cash", "lash", "gash", "mash", "smash"],
  ["rock", "rack", "sack", "pack", "back", "black"],
  ["rock", "rack", "sack", "pack", "peck", "speck"],
  ["rock", "rack", "sack", "pack", "puck", "pluck"],
  ["rock", "rack", "sack", "pack", "tack", "stack"],
  ["rock", "rack", "sack", "pack", "tack", "track"],
  ["rock", "rack", "sack", "shack", "shock", "smock"],
  ["rush", "rash", "mash", "lash", "slash", "clash"],
  ["rush", "rash", "mash", "lash", "slash", "flash"],
  ["rush", "rash", "mash", "lash", "slash", "smash"],
  ["rush", "rash", "mash", "smash", "slash", "clash"],
  ["rush", "rash", "mash", "smash", "slash", "flash"],
  ["rush", "rash", "mash", "smash", "slash", "lash"],
  ["sack", "shack", "shock", "smock", "smack", "snack"],
  ["sack", "shack", "shock", "smock", "smack", "stack"],
  ["sack", "shack", "shock", "smock", "sock", "dock"],
  ["sack", "shack", "shock", "smock", "sock", "lock"],
  ["sack", "shack", "shock", "smock", "sock", "rock"],
  ["sack", "shack", "shock", "smock", "sock", "sick"],
  ["shack", "smack", "sack", "back", "pack", "rack"],
  ["shack", "smack", "sack", "back", "pack", "tack"],
  ["shack", "smack", "sack", "back", "rack", "crack"],
  ["shack", "smack", "sack", "back", "rack", "pack"],
  ["shack", "smack", "sack", "back", "rack", "rock"],
  ["shack", "smack", "sack", "back", "rack", "tack"],
  ["shin", "chin", "chip", "chimp", "chomp", "chop"],
  ["shin", "chin", "chip", "chop", "chomp", "chimp"],
  ["shin", "thin", "chin", "chip", "chimp", "chomp"],
  ["shin", "thin", "chin", "chip", "chop", "chomp"],
  ["shock", "smock", "sock", "sack", "stack", "stick"],
  ["shock", "smock", "sock", "sack", "stack", "stuck"],
  ["shock", "smock", "sock", "sack", "stack", "tack"],
  ["shock", "smock", "sock", "sack", "suck", "buck"],
  ["shock", "smock", "sock", "sack", "suck", "duck"],
  ["shock", "smock", "sock", "sack", "suck", "luck"],
  ["shop", "chop", "chomp", "chimp", "chip", "chin"],
  ["shop", "chop", "chomp", "chimp", "chip", "whip"],
  ["shot", "shop", "chop", "chip", "chimp", "chomp"],
  ["shot", "shop", "chop", "chomp", "chimp", "chip"],
  ["shush", "hush", "rush", "rash", "crash", "clash"],
  ["shush", "hush", "rush", "rash", "crash", "crush"],
  ["shush", "hush", "rush", "rash", "lash", "clash"],
  ["shush", "hush", "rush", "rash", "lash", "flash"],
  ["shush", "hush", "rush", "rash", "lash", "slash"],
  ["shush", "hush", "rush", "rash", "mash", "smash"],
  ["shut", "shot", "shop", "chop", "chip", "chimp"],
  ["shut", "shot", "shop", "chop", "chomp", "chimp"],
  ["sick", "pick", "pack", "sack", "rack", "crack"],
  ["sick", "pick", "pack", "sack", "rack", "track"],
  ["sick", "pick", "pack", "sack", "shack", "smack"],
  ["sick", "pick", "pack", "sack", "shack", "snack"],
  ["sick", "pick", "pack", "sack", "shack", "stack"],
  ["sick", "pick", "pack", "sack", "smack", "shack"],
  ["slash", "clash", "lash", "mash", "ash", "gash"],
  ["slash", "clash", "lash", "mash", "ash", "rash"],
  ["slash", "clash", "lash", "mash", "bash", "ash"],
  ["slash", "clash", "lash", "mash", "bash", "bath"],
  ["slash", "clash", "lash", "mash", "bash", "cash"],
  ["slash", "clash", "lash", "mash", "bash", "dash"],
  ["slick", "flick", "lick", "luck", "puck", "suck"],
  ["slick", "flick", "lick", "luck", "puck", "tuck"],
  ["slick", "flick", "lick", "luck", "suck", "buck"],
  ["slick", "flick", "lick", "luck", "suck", "duck"],
  ["slick", "flick", "lick", "luck", "suck", "puck"],
  ["slick", "flick", "lick", "luck", "suck", "sack"],
  ["smack", "sack", "sick", "tick", "tack", "track"],
  ["smack", "sack", "sick", "tick", "tack", "tuck"],
  ["smack", "sack", "sick", "tick", "trick", "brick"],
  ["smack", "sack", "sick", "tick", "trick", "track"],
  ["smack", "sack", "sick", "tick", "trick", "truck"],
  ["smack", "sack", "sick", "tick", "tuck", "buck"],
  ["smash", "mash", "dash", "bash", "ash", "cash"],
  ["smash", "mash", "dash", "bash", "ash", "gash"],
  ["smash", "mash", "dash", "bash", "ash", "lash"],
  ["smash", "mash", "dash", "bash", "ash", "rash"],
  ["smash", "mash", "dash", "bash", "bath", "math"],
  ["smash", "mash", "dash", "bash", "bath", "path"],
  ["smock", "smack", "sack", "tack", "tuck", "stuck"],
  ["smock", "smack", "sack", "tack", "tuck", "suck"],
  ["smock", "smack", "sack", "tack", "tuck", "tick"],
  ["smock", "smack", "sack", "tack", "tuck", "truck"],
  ["smock", "smack", "shack", "sack", "back", "black"],
  ["smock", "smack", "shack", "sack", "back", "buck"],
  ["snack", "sack", "sick", "suck", "tuck", "tick"],
  ["snack", "sack", "sick", "suck", "tuck", "truck"],
  ["snack", "sack", "sick", "tick", "kick", "lick"],
  ["snack", "sack", "sick", "tick", "kick", "pick"],
  ["snack", "sack", "sick", "tick", "lick", "click"],
  ["snack", "sack", "sick", "tick", "lick", "flick"],
  ["sock", "sack", "back", "rack", "track", "tack"],
  ["sock", "sack", "back", "rack", "track", "trick"],
  ["sock", "sack", "back", "rack", "track", "truck"],
  ["sock", "sack", "back", "tack", "rack", "crack"],
  ["sock", "sack", "back", "tack", "rack", "track"],
  ["sock", "sack", "back", "tack", "stack", "shack"],
  ["speck", "peck", "puck", "duck", "tuck", "tick"],
  ["speck", "peck", "puck", "duck", "tuck", "truck"],
  ["speck", "peck", "puck", "luck", "buck", "back"],
  ["speck", "peck", "puck", "luck", "buck", "duck"],
  ["speck", "peck", "puck", "luck", "buck", "suck"],
  ["speck", "peck", "puck", "luck", "buck", "tuck"],
  ["stack", "sack", "sick", "tick", "trick", "track"],
  ["stack", "sack", "sick", "tick", "trick", "truck"],
  ["stack", "sack", "sick", "tick", "tuck", "buck"],
  ["stack", "sack", "sick", "tick", "tuck", "duck"],
  ["stack", "sack", "sick", "tick", "tuck", "luck"],
  ["stack", "sack", "sick", "tick", "tuck", "puck"],
  ["stick", "sick", "sack", "suck", "buck", "luck"],
  ["stick", "sick", "sack", "suck", "buck", "puck"],
  ["stick", "sick", "sack", "suck", "buck", "tuck"],
  ["stick", "sick", "sack", "suck", "duck", "buck"],
  ["stick", "sick", "sack", "suck", "duck", "deck"],
  ["stick", "sick", "sack", "suck", "duck", "dock"],
  ["stuck", "stack", "stick", "tick", "pick", "lick"],
  ["stuck", "stack", "stick", "tick", "pick", "pack"],
  ["stuck", "stack", "stick", "tick", "pick", "peck"],
  ["stuck", "stack", "stick", "tick", "pick", "puck"],
  ["stuck", "stack", "stick", "tick", "pick", "sick"],
  ["stuck", "stack", "stick", "tick", "sick", "kick"],
  ["suck", "duck", "tuck", "tick", "stick", "slick"],
  ["suck", "duck", "tuck", "tick", "stick", "stack"],
  ["suck", "duck", "tuck", "tick", "stick", "stuck"],
  ["suck", "duck", "tuck", "tick", "tack", "stack"],
  ["suck", "duck", "tuck", "tick", "tack", "track"],
  ["suck", "duck", "tuck", "tick", "trick", "brick"],
  ["swish", "wish", "fish", "dish", "dash", "bash"],
  ["swish", "wish", "fish", "dish", "dash", "cash"],
  ["swish", "wish", "fish", "dish", "dash", "gash"],
  ["swish", "wish", "fish", "dish", "dash", "lash"],
  ["swish", "wish", "fish", "dish", "dash", "mash"],
  ["swish", "wish", "fish", "dish", "dash", "rash"],
  ["tack", "pack", "sack", "stack", "stuck", "stick"],
  ["tack", "pack", "sack", "stack", "stuck", "suck"],
  ["tack", "pack", "sack", "stack", "stuck", "tuck"],
  ["tack", "pack", "sack", "suck", "luck", "cluck"],
  ["tack", "pack", "sack", "suck", "luck", "pluck"],
  ["tack", "pack", "sack", "suck", "puck", "pluck"],
  ["thin", "chin", "chip", "chimp", "chomp", "chop"],
  ["thin", "chin", "chip", "chop", "chomp", "chimp"],
  ["thin", "shin", "chin", "chip", "chimp", "chomp"],
  ["thin", "shin", "chin", "chip", "chop", "chomp"],
  ["tick", "lick", "sick", "suck", "stuck", "stack"],
  ["tick", "lick", "sick", "suck", "stuck", "stick"],
  ["tick", "lick", "sick", "suck", "stuck", "tuck"],
  ["tick", "lick", "sick", "suck", "tuck", "stuck"],
  ["tick", "lick", "sick", "suck", "tuck", "truck"],
  ["tick", "lick", "slick", "click", "chick", "check"],
  ["track", "rack", "rock", "dock", "deck", "peck"],
  ["track", "rack", "rock", "dock", "duck", "buck"],
  ["track", "rack", "rock", "dock", "duck", "deck"],
  ["track", "rack", "rock", "dock", "duck", "luck"],
  ["track", "rack", "rock", "dock", "duck", "puck"],
  ["track", "rack", "rock", "dock", "duck", "suck"],
  ["trick", "tick", "sick", "lick", "slick", "click"],
  ["trick", "tick", "sick", "lick", "slick", "flick"],
  ["trick", "tick", "sick", "lick", "slick", "stick"],
  ["trick", "tick", "sick", "pick", "kick", "lick"],
  ["trick", "tick", "sick", "pick", "lick", "click"],
  ["trick", "tick", "sick", "pick", "lick", "flick"],
  ["truck", "trick", "tick", "lick", "kick", "sick"],
  ["truck", "trick", "tick", "lick", "lock", "block"],
  ["truck", "trick", "tick", "lick", "lock", "clock"],
  ["truck", "trick", "tick", "lick", "lock", "dock"],
  ["truck", "trick", "tick", "lick", "lock", "flock"],
  ["truck", "trick", "tick", "lick", "lock", "luck"],
  ["tuck", "duck", "suck", "luck", "lick", "flick"],
  ["tuck", "duck", "suck", "luck", "lick", "slick"],
  ["tuck", "duck", "suck", "luck", "lock", "block"],
  ["tuck", "duck", "suck", "luck", "lock", "clock"],
  ["tuck", "duck", "suck", "luck", "lock", "flock"],
  ["tuck", "duck", "suck", "luck", "pluck", "cluck"],
  ["whack", "shack", "stack", "tack", "tuck", "luck"],
  ["whack", "shack", "stack", "tack", "tuck", "puck"],
  ["whack", "shack", "stack", "tack", "tuck", "stuck"],
  ["whack", "shack", "stack", "tack", "tuck", "suck"],
  ["whack", "shack", "stack", "tack", "tuck", "tick"],
  ["whack", "shack", "stack", "tack", "tuck", "truck"],
  ["whip", "chip", "chimp", "chomp", "chop", "shop"],
  ["whiz", "whip", "chip", "chimp", "chomp", "chop"],
  ["whiz", "whip", "chip", "chop", "chomp", "chimp"],
  ["wish", "fish", "dish", "dash", "cash", "crash"],
  ["wish", "fish", "dish", "dash", "lash", "clash"],
  ["wish", "fish", "dish", "dash", "lash", "flash"],
  ["wish", "fish", "dish", "dash", "lash", "slash"],
  ["wish", "fish", "dish", "dash", "mash", "smash"],
  ["wish", "fish", "dish", "dash", "rash", "crash"],
];

// Mode selector (two options per Sean): "Digraphs" and "Include Blends"
function getLaddersByMode(label){
  switch(label){
    case "Include Blends":
      return typeof digraphBlendLadders !== 'undefined' ? digraphBlendLadders : [];
    case "Digraphs":
    default:
      return typeof digraphWordLadders !== 'undefined' ? digraphWordLadders : [];
  }
}

if (typeof window !== 'undefined'){
  window.rWordPatterns = rWordPatterns;
  window.rWordImages = rWordImages;
  window.getLaddersByMode = getLaddersByMode;
}