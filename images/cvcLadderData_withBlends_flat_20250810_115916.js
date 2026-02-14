const cvcLadderWords = [
  "bag", "bat", "bed", "beg", "bib", "bin", "bot", "box", "bug", "bun",
  "bus", "cab", "can", "cap", "cat", "cod", "cop", "cot", "cub", "cup",
  "cut", "dad", "dam", "den", "dig", "doc", "dog", "dot", "dug", "fan",
  "fin", "gap", "gum", "ham", "hat", "hen", "hid", "hip", "hit", "hog",
  "hop", "hot", "hug", "hut", "jag", "jet", "jig", "job", "jog", "jug",
  "kid", "kit", "lab", "leg", "lid", "lip", "lit", "lob", "log", "mad",
  "man", "map", "mat", "mom", "mop", "mud", "mug", "nap", "net", "nut",
  "pad", "pan", "pen", "pet", "pig", "pin", "pit", "pop", "pot", "pug",
  "pup", "rag", "ram", "rat", "rib", "rig", "rim", "rip", "rob", "rod",
  "rug", "run", "sad", "sap", "sip", "sit", "sob", "sub", "sun", "tag",
  "tap", "ten", "tin", "top", "tub", "tug", "tux", "van", "vet", "wag",
  "wax", "web", "wed", "wig", "win", "zap", "zip", "fix", "fox", "six",
  "sax", "men", "mix"

];

const cvcLadderImages = {
  "bag": "images/bag.png",
  "mix": "images/mix.png",
  "bat": "images/bat.png",
  "bed": "images/bed.png",
  "beg": "images/beg.png",
  "bib": "images/bib.png",
  "bin": "images/bin.png",
  "bot": "images/bot.png",
  "box": "images/box.png",
  "bug": "images/bug.png",
  "bun": "images/bun.png",
  "bus": "images/bus.png",
  "cab": "images/cab.png",
  "can": "images/can.png",
  "cap": "images/cap.png",
  "cat": "images/cat.png",
  "cod": "images/cod.png",
  "cop": "images/cop.png",
  "cot": "images/cot.png",
  "cub": "images/cub.png",
  "cup": "images/cup.png",
  "cut": "images/cut.png",
  "dad": "images/dad.png",
  "dam": "images/dam.png",
  "den": "images/den.png",
  "dig": "images/dig.png",
  "doc": "images/doc.png",
  "dog": "images/dog.png",
  "dot": "images/dot.png",
  "dug": "images/dug.png",
  "fan": "images/fan.png",
  "fin": "images/fin.png",
  "gap": "images/gap.png",
  "gum": "images/gum.png",
  "ham": "images/ham.png",
  "hat": "images/hat.png",
  "hen": "images/hen.png",
  "hid": "images/hid.png",
  "hip": "images/hip.png",
  "hit": "images/hit.png",
  "hog": "images/hog.png",
  "hop": "images/hop.png",
  "hot": "images/hot.png",
  "hug": "images/hug.png",
  "hut": "images/hut.png",
  "jag": "images/jag.png",
  "jet": "images/jet.png",
  "jig": "images/jig.png",
  "job": "images/job.png",
  "jog": "images/jog.png",
  "jug": "images/jug.png",
  "kid": "images/kid.png",
  "kit": "images/kit.png",
  "lab": "images/lab.png",
  "leg": "images/leg.png",
  "lid": "images/lid.png",
  "lip": "images/lip.png",
  "lit": "images/lit.png",
  "lob": "images/lob.png",
  "log": "images/log.png",
  "mad": "images/mad.png",
  "man": "images/man.png",
  "map": "images/map.png",
  "mat": "images/mat.png",
  "mom": "images/mom.png",
  "mop": "images/mop.png",
  "mud": "images/mud.png",
  "mug": "images/mug.png",
  "nap": "images/nap.png",
  "net": "images/net.png",
  "nut": "images/nut.png",
  "pad": "images/pad.png",
  "pan": "images/pan.png",
  "pen": "images/pen.png",
  "pet": "images/pet.png",
  "pig": "images/pig.png",
  "pin": "images/pin.png",
  "pit": "images/pit.png",
  "pop": "images/pop.png",
  "pot": "images/pot.png",
  "pug": "images/pug.png",
  "pup": "images/pup.png",
  "rag": "images/rag.png",
  "ram": "images/ram.png",
  "rat": "images/rat.png",
  "rib": "images/rib.png",
  "rig": "images/rig.png",
  "rim": "images/rim.png",
  "rip": "images/rip.png",
  "rob": "images/rob.png",
  "rod": "images/rod.png",
  "rug": "images/rug.png",
  "run": "images/run.png",
  "sad": "images/sad.png",
  "sap": "images/sap.png",
  "sip": "images/sip.png",
  "sit": "images/sit.png",
  "sob": "images/sob.png",
  "sub": "images/sub.png",
  "sun": "images/sun.png",
  "tag": "images/tag.png",
  "tap": "images/tap.png",
  "ten": "images/ten.png",
  "tin": "images/tin.png",
  "top": "images/top.png",
  "tub": "images/tub.png",
  "tug": "images/tug.png",
  "tux": "images/tux.png",
  "van": "images/van.png",
  "vet": "images/vet.png",
  "wag": "images/wag.png",
  "wax": "images/wax.png",
  "web": "images/web.png",
  "wed": "images/wed.png",
  "wig": "images/wig.png",
  "win": "images/win.png",
  "zap": "images/zap.png",
  "fox": "images/fox.png",
  "fix": "images/fix.png",
  "six": "images/six.png",
  "men": "images/men.png",
  "sax": "images/sax.png",
  "zip": "images/zip.png"
};

// === Short Vowel Blends (generated) ===
const cvcLadderBlends = {
  "Short A with Blends": [
    {
      "word": "blab",
      "pattern": "1111",
      "image": "images/blab.png"
    },
    {
      "word": "clad",
      "pattern": "1111",
      "image": "images/clad.png"
    },
    {
      "word": "clap",
      "pattern": "1111",
      "image": "images/clap.png"
    },
    {
      "word": "clan",
      "pattern": "1111",
      "image": "images/clan.png"
    },
    {
      "word": "clam",
      "pattern": "1111",
      "image": "images/clam.png"
    },
    {
      "word": "class",
      "pattern": "1112",
      "image": "images/class.png"
    },
    {
      "word": "Brad",
      "pattern": "1111",
      "image": "images/brad.png"
    },
    {
      "word": "brag",
      "pattern": "1111",
      "image": "images/brag.png"
    },
    {
      "word": "bran",
      "pattern": "1111",
      "image": "images/bran.png"
    },
    {
      "word": "brass",
      "pattern": "1112",
      "image": "images/brass.png"
    },
    {
      "word": "brat",
      "pattern": "1111",
      "image": "images/brat.png"
    },
    {
      "word": "cram",
      "pattern": "1111",
      "image": "images/cram.png"
    },
    {
      "word": "flag",
      "pattern": "1111",
      "image": "images/flag.png"
    },
    {
      "word": "flap",
      "pattern": "1111",
      "image": "images/flap.png"
    },
    {
      "word": "flat",
      "pattern": "1111",
      "image": "images/flat.png"
    },
    {
      "word": "flax",
      "pattern": "1111",
      "image": "images/flax.png"
    },
    {
      "word": "Fran",
      "pattern": "1111",
      "image": "images/fran.png"
    },
    {
      "word": "frat",
      "pattern": "1111",
      "image": "images/frat.png"
    },
    {
      "word": "glad",
      "pattern": "1111",
      "image": "images/glad.png"
    },
    {
      "word": "glam",
      "pattern": "1111",
      "image": "images/glam.png"
    },
    {
      "word": "glass",
      "pattern": "1112",
      "image": "images/glass.png"
    },
    {
      "word": "grab",
      "pattern": "1111",
      "image": "images/grab.png"
    },
    {
      "word": "grad",
      "pattern": "1111",
      "image": "images/grad.png"
    },
    {
      "word": "gram",
      "pattern": "1111",
      "image": "images/gram.png"
    },
    {
      "word": "grass",
      "pattern": "1112",
      "image": "images/grass.png"
    },
    {
      "word": "plan",
      "pattern": "1111",
      "image": "images/plan.png"
    },
    {
      "word": "slab",
      "pattern": "1111",
      "image": "images/slab.png"
    },
    {
      "word": "slam",
      "pattern": "1111",
      "image": "images/slam.png"
    },
    {
      "word": "slap",
      "pattern": "1111",
      "image": "images/slap.png"
    },
    {
      "word": "slat",
      "pattern": "1111",
      "image": "images/slat.png"
    },
    {
      "word": "scab",
      "pattern": "1111",
      "image": "images/scab.png"
    },
    {
      "word": "scam",
      "pattern": "1111",
      "image": "images/scam.png"
    },
    {
      "word": "scan",
      "pattern": "1111",
      "image": "images/scan.png"
    },
    {
      "word": "snag",
      "pattern": "1111",
      "image": "images/snag.png"
    },
    {
      "word": "snap",
      "pattern": "1111",
      "image": "images/snap.png"
    },
    {
      "word": "span",
      "pattern": "1111",
      "image": "images/span.png"
    },
    {
      "word": "spat",
      "pattern": "1111",
      "image": "images/spat.png"
    },
    {
      "word": "stab",
      "pattern": "1111",
      "image": "images/stab.png"
    },
    {
      "word": "stat",
      "pattern": "1111",
      "image": "images/stat.png"
    },
    {
      "word": "Stan",
      "pattern": "1111",
      "image": "images/stan.png"
    },
    {
      "word": "swag",
      "pattern": "1111",
      "image": "images/swag.png"
    },
    {
      "word": "swam",
      "pattern": "1111",
      "image": "images/swam.png"
    },
    {
      "word": "crab",
      "pattern": "1111",
      "image": "images/crab.png"
    },
    {
      "word": "drag",
      "pattern": "1111",
      "image": "images/drag.png"
    },
    {
      "word": "tram",
      "pattern": "1111",
      "image": "images/tram.png"
    },
    {
      "word": "trap",
      "pattern": "1111",
      "image": "images/trap.png"
    },
    {
      "word": "band",
      "pattern": "1111",
      "image": "images/band.png"
    },
    {
      "word": "land",
      "pattern": "1111",
      "image": "images/land.png"
    },
    {
      "word": "sand",
      "pattern": "1111",
      "image": "images/sand.png"
    },
    {
      "word": "pant",
      "pattern": "1111",
      "image": "images/pant.png"
    },
    {
      "word": "rant",
      "pattern": "1111",
      "image": "images/rant.png"
    },
    {
      "word": "lamp",
      "pattern": "1111",
      "image": "images/lamp.png"
    },
    {
      "word": "damp",
      "pattern": "1111",
      "image": "images/damp.png"
    },
    {
      "word": "ramp",
      "pattern": "1111",
      "image": "images/ramp.png"
    },
    {
      "word": "fast",
      "pattern": "1111",
      "image": "images/fast.png"
    },
    {
      "word": "cast",
      "pattern": "1111",
      "image": "images/cast.png"
    },
    {
      "word": "last",
      "pattern": "1111",
      "image": "images/last.png"
    },
    {
      "word": "mast",
      "pattern": "1111",
      "image": "images/mast.png"
    },
    {
      "word": "past",
      "pattern": "1111",
      "image": "images/past.png"
    },
    {
      "word": "ask",
      "pattern": "111",
      "image": "images/ask.png"
    },
    {
      "word": "bask",
      "pattern": "1111",
      "image": "images/bask.png"
    },
    {
      "word": "mask",
      "pattern": "1111",
      "image": "images/mask.png"
    },
    {
      "word": "task",
      "pattern": "1111",
      "image": "images/task.png"
    },
    {
      "word": "raft",
      "pattern": "1111",
      "image": "images/raft.png"
    },
    {
      "word": "act",
      "pattern": "111",
      "image": "images/act.png"
    },
    {
      "word": "fact",
      "pattern": "1111",
      "image": "images/fact.png"
    },
    {
      "word": "pact",
      "pattern": "1111",
      "image": "images/pact.png"
    },
    {
      "word": "hand",
      "pattern": "1111",
      "image": "images/hand.png"
    },
    {
      "word": "vast",
      "pattern": "1111",
      "image": "images/vast.png"
    },
    {
      "word": "camp",
      "pattern": "1111",
      "image": "images/camp.png"
    }
  ],
  "Short I with Blends": [
    {
      "word": "blip",
      "pattern": "1111",
      "image": "images/blip.png"
    },
    {
      "word": "clip",
      "pattern": "1111",
      "image": "images/clip.png"
    },
    {
      "word": "cliff",
      "pattern": "1112",
      "image": "images/cliff.png"
    },
    {
      "word": "flip",
      "pattern": "1111",
      "image": "images/flip.png"
    },
    {
      "word": "slim",
      "pattern": "1111",
      "image": "images/slim.png"
    },
    {
      "word": "slip",
      "pattern": "1111",
      "image": "images/slip.png"
    },
    {
      "word": "snip",
      "pattern": "1111",
      "image": "images/snip.png"
    },
    {
      "word": "spin",
      "pattern": "1111",
      "image": "images/spin.png"
    },
    {
      "word": "spit",
      "pattern": "1111",
      "image": "images/spit.png"
    },
    {
      "word": "skid",
      "pattern": "1111",
      "image": "images/skid.png"
    },
    {
      "word": "skim",
      "pattern": "1111",
      "image": "images/skim.png"
    },
    {
      "word": "skin",
      "pattern": "1111",
      "image": "images/skin.png"
    },
    {
      "word": "skip",
      "pattern": "1111",
      "image": "images/skip.png"
    },
    {
      "word": "skit",
      "pattern": "1111",
      "image": "images/skit.png"
    },
    {
      "word": "swim",
      "pattern": "1111",
      "image": "images/swim.png"
    },
    {
      "word": "swig",
      "pattern": "1111",
      "image": "images/swig.png"
    },
    {
      "word": "brim",
      "pattern": "1111",
      "image": "images/brim.png"
    },
    {
      "word": "brig",
      "pattern": "1111",
      "image": "images/brig.png"
    },
    {
      "word": "crib",
      "pattern": "1111",
      "image": "images/crib.png"
    },
    {
      "word": "drip",
      "pattern": "1111",
      "image": "images/drip.png"
    },
    {
      "word": "grid",
      "pattern": "1111",
      "image": "images/grid.png"
    },
    {
      "word": "grim",
      "pattern": "1111",
      "image": "images/grim.png"
    },
    {
      "word": "grin",
      "pattern": "1111",
      "image": "images/grin.png"
    },
    {
      "word": "grip",
      "pattern": "1111",
      "image": "images/grip.png"
    },
    {
      "word": "grit",
      "pattern": "1111",
      "image": "images/grit.png"
    },
    {
      "word": "prim",
      "pattern": "1111",
      "image": "images/prim.png"
    },
    {
      "word": "trim",
      "pattern": "1111",
      "image": "images/trim.png"
    },
    {
      "word": "trip",
      "pattern": "1111",
      "image": "images/trip.png"
    },
    {
      "word": "wind",
      "pattern": "1111",
      "image": "images/wind.png"
    },
    {
      "word": "hint",
      "pattern": "1111",
      "image": "images/hint.png"
    },
    {
      "word": "mint",
      "pattern": "1111",
      "image": "images/mint.png"
    },
    {
      "word": "tint",
      "pattern": "1111",
      "image": "images/tint.png"
    },
    {
      "word": "limp",
      "pattern": "1111",
      "image": "images/limp.png"
    },
    {
      "word": "wimp",
      "pattern": "1111",
      "image": "images/wimp.png"
    },
    {
      "word": "fist",
      "pattern": "1111",
      "image": "images/fist.png"
    },
    {
      "word": "list",
      "pattern": "1111",
      "image": "images/list.png"
    },
    {
      "word": "mist",
      "pattern": "1111",
      "image": "images/mist.png"
    },
    {
      "word": "disk",
      "pattern": "1111",
      "image": "images/disk.png"
    },
    {
      "word": "risk",
      "pattern": "1111",
      "image": "images/risk.png"
    },
    {
      "word": "gift",
      "pattern": "1111",
      "image": "images/gift.png"
    },
    {
      "word": "lift",
      "pattern": "1111",
      "image": "images/lift.png"
    },
    {
      "word": "rift",
      "pattern": "1111",
      "image": "images/rift.png"
    },
    {
      "word": "milk",
      "pattern": "1111",
      "image": "images/milk.png"
    },
    {
      "word": "silk",
      "pattern": "1111",
      "image": "images/silk.png"
    },
    {
      "word": "kilt",
      "pattern": "1111",
      "image": "images/kilt.png"
    },
    {
      "word": "tilt",
      "pattern": "1111",
      "image": "images/tilt.png"
    }
  ],
  "Short E with Blends": [
    {
      "word": "fled",
      "pattern": "1111",
      "image": "images/fled.png"
    },
    {
      "word": "Glen",
      "pattern": "1111",
      "image": "images/glen.png"
    },
    {
      "word": "sled",
      "pattern": "1111",
      "image": "images/sled.png"
    },
    {
      "word": "sped",
      "pattern": "1111",
      "image": "images/sped.png"
    },
    {
      "word": "step",
      "pattern": "1111",
      "image": "images/step.png"
    },
    {
      "word": "stem",
      "pattern": "1111",
      "image": "images/stem.png"
    },
    {
      "word": "prep",
      "pattern": "1111",
      "image": "images/prep.png"
    },
    {
      "word": "bend",
      "pattern": "1111",
      "image": "images/bend.png"
    },
    {
      "word": "send",
      "pattern": "1111",
      "image": "images/send.png"
    },
    {
      "word": "lend",
      "pattern": "1111",
      "image": "images/lend.png"
    },
    {
      "word": "tend",
      "pattern": "1111",
      "image": "images/tend.png"
    },
    {
      "word": "bent",
      "pattern": "1111",
      "image": "images/bent.png"
    },
    {
      "word": "vent",
      "pattern": "1111",
      "image": "images/vent.png"
    },
    {
      "word": "lent",
      "pattern": "1111",
      "image": "images/lent.png"
    },
    {
      "word": "sent",
      "pattern": "1111",
      "image": "images/sent.png"
    },
    {
      "word": "hemp",
      "pattern": "1111",
      "image": "images/hemp.png"
    },
    {
      "word": "temp",
      "pattern": "1111",
      "image": "images/temp.png"
    },
    {
      "word": "best",
      "pattern": "1111",
      "image": "images/best.png"
    },
    {
      "word": "nest",
      "pattern": "1111",
      "image": "images/nest.png"
    },
    {
      "word": "pest",
      "pattern": "1111",
      "image": "images/pest.png"
    },
    {
      "word": "rest",
      "pattern": "1111",
      "image": "images/rest.png"
    },
    {
      "word": "test",
      "pattern": "1111",
      "image": "images/test.png"
    },
    {
      "word": "vest",
      "pattern": "1111",
      "image": "images/vest.png"
    },
    {
      "word": "west",
      "pattern": "1111",
      "image": "images/west.png"
    },
    {
      "word": "desk",
      "pattern": "1111",
      "image": "images/desk.png"
    },
    {
      "word": "left",
      "pattern": "1111",
      "image": "images/left.png"
    },
    {
      "word": "kept",
      "pattern": "1111",
      "image": "images/kept.png"
    },
    {
      "word": "wept",
      "pattern": "1111",
      "image": "images/wept.png"
    },
    {
      "word": "self",
      "pattern": "1111",
      "image": "images/self.png"
    },
    {
      "word": "help",
      "pattern": "1111",
      "image": "images/help.png"
    },
    {
      "word": "yelp",
      "pattern": "1111",
      "image": "images/yelp.png"
    },
    {
      "word": "belt",
      "pattern": "1111",
      "image": "images/belt.png"
    },
    {
      "word": "felt",
      "pattern": "1111",
      "image": "images/felt.png"
    },
    {
      "word": "melt",
      "pattern": "1111",
      "image": "images/melt.png"
    },
    {
      "word": "pelt",
      "pattern": "1111",
      "image": "images/pelt.png"
    },
    {
      "word": "welt",
      "pattern": "1111",
      "image": "images/welt.png"
    },
    {
      "word": "held",
      "pattern": "1111",
      "image": "images/held.png"
    },
    {
      "word": "helm",
      "pattern": "1111",
      "image": "images/helm.png"
    }
  ],
  "Short O with Blends": [
    {
      "word": "blob",
      "pattern": "1111",
      "image": "images/blob.png"
    },
    {
      "word": "blog",
      "pattern": "1111",
      "image": "images/blog.png"
    },
    {
      "word": "blot",
      "pattern": "1111",
      "image": "images/blot.png"
    },
    {
      "word": "clod",
      "pattern": "1111",
      "image": "images/clod.png"
    },
    {
      "word": "clop",
      "pattern": "1111",
      "image": "images/clop.png"
    },
    {
      "word": "clot",
      "pattern": "1111",
      "image": "images/clot.png"
    },
    {
      "word": "flog",
      "pattern": "1111",
      "image": "images/flog.png"
    },
    {
      "word": "flop",
      "pattern": "1111",
      "image": "images/flop.png"
    },
    {
      "word": "glob",
      "pattern": "1111",
      "image": "images/glob.png"
    },
    {
      "word": "glop",
      "pattern": "1111",
      "image": "images/glop.png"
    },
    {
      "word": "plod",
      "pattern": "1111",
      "image": "images/plod.png"
    },
    {
      "word": "plot",
      "pattern": "1111",
      "image": "images/plot.png"
    },
    {
      "word": "plop",
      "pattern": "1111",
      "image": "images/plop.png"
    },
    {
      "word": "slob",
      "pattern": "1111",
      "image": "images/slob.png"
    },
    {
      "word": "slop",
      "pattern": "1111",
      "image": "images/slop.png"
    },
    {
      "word": "slot",
      "pattern": "1111",
      "image": "images/slot.png"
    },
    {
      "word": "smog",
      "pattern": "1111",
      "image": "images/smog.png"
    },
    {
      "word": "snob",
      "pattern": "1111",
      "image": "images/snob.png"
    },
    {
      "word": "snot",
      "pattern": "1111",
      "image": "images/snot.png"
    },
    {
      "word": "spot",
      "pattern": "1111",
      "image": "images/spot.png"
    },
    {
      "word": "stop",
      "pattern": "1111",
      "image": "images/stop.png"
    },
    {
      "word": "crop",
      "pattern": "1111",
      "image": "images/crop.png"
    },
    {
      "word": "croc",
      "pattern": "1111",
      "image": "images/croc.png"
    },
    {
      "word": "frog",
      "pattern": "1111",
      "image": "images/frog.png"
    },
    {
      "word": "prom",
      "pattern": "1111",
      "image": "images/prom.png"
    },
    {
      "word": "prop",
      "pattern": "1111",
      "image": "images/prop.png"
    },
    {
      "word": "trot",
      "pattern": "1111",
      "image": "images/trot.png"
    },
    {
      "word": "trod",
      "pattern": "1111",
      "image": "images/trod.png"
    },
    {
      "word": "bond",
      "pattern": "1111",
      "image": "images/bond.png"
    },
    {
      "word": "fond",
      "pattern": "1111",
      "image": "images/fond.png"
    },
    {
      "word": "pond",
      "pattern": "1111",
      "image": "images/pond.png"
    },
    {
      "word": "font",
      "pattern": "1111",
      "image": "images/font.png"
    },
    {
      "word": "romp",
      "pattern": "1111",
      "image": "images/romp.png"
    },
    {
      "word": "cost",
      "pattern": "1111",
      "image": "images/cost.png"
    },
    {
      "word": "lost",
      "pattern": "1111",
      "image": "images/lost.png"
    },
    {
      "word": "loft",
      "pattern": "1111",
      "image": "images/loft.png"
    },
    {
      "word": "soft",
      "pattern": "1111",
      "image": "images/soft.png"
    },
    {
      "word": "opt",
      "pattern": "111",
      "image": "images/opt.png"
    },
    {
      "word": "golf",
      "pattern": "1111",
      "image": "images/golf.png"
    }
  ],
  "Short U with Blends": [
    {
      "word": "club",
      "pattern": "1111",
      "image": "images/club.png"
    },
    {
      "word": "bluff",
      "pattern": "1112",
      "image": "images/bluff.png"
    },
    {
      "word": "flub",
      "pattern": "1111",
      "image": "images/flub.png"
    },
    {
      "word": "glum",
      "pattern": "1111",
      "image": "images/glum.png"
    },
    {
      "word": "glug",
      "pattern": "1111",
      "image": "images/glug.png"
    },
    {
      "word": "plug",
      "pattern": "1111",
      "image": "images/plug.png"
    },
    {
      "word": "plum",
      "pattern": "1111",
      "image": "images/plum.png"
    },
    {
      "word": "plus",
      "pattern": "1111",
      "image": "images/plus.png"
    },
    {
      "word": "slug",
      "pattern": "1111",
      "image": "images/slug.png"
    },
    {
      "word": "slum",
      "pattern": "1111",
      "image": "images/slum.png"
    },
    {
      "word": "smug",
      "pattern": "1111",
      "image": "images/smug.png"
    },
    {
      "word": "snub",
      "pattern": "1111",
      "image": "images/snub.png"
    },
    {
      "word": "snug",
      "pattern": "1111",
      "image": "images/snug.png"
    },
    {
      "word": "spud",
      "pattern": "1111",
      "image": "images/spud.png"
    },
    {
      "word": "spun",
      "pattern": "1111",
      "image": "images/spun.png"
    },
    {
      "word": "stub",
      "pattern": "1111",
      "image": "images/stub.png"
    },
    {
      "word": "stun",
      "pattern": "1111",
      "image": "images/stun.png"
    },
    {
      "word": "swum",
      "pattern": "1111",
      "image": "images/swum.png"
    },
    {
      "word": "drug",
      "pattern": "1111",
      "image": "images/drug.png"
    },
    {
      "word": "drum",
      "pattern": "1111",
      "image": "images/drum.png"
    },
    {
      "word": "grub",
      "pattern": "1111",
      "image": "images/grub.png"
    },
    {
      "word": "fund",
      "pattern": "1111",
      "image": "images/fund.png"
    },
    {
      "word": "bunt",
      "pattern": "1111",
      "image": "images/bunt.png"
    },
    {
      "word": "hunt",
      "pattern": "1111",
      "image": "images/hunt.png"
    },
    {
      "word": "punt",
      "pattern": "1111",
      "image": "images/punt.png"
    },
    {
      "word": "runt",
      "pattern": "1111",
      "image": "images/runt.png"
    },
    {
      "word": "bump",
      "pattern": "1111",
      "image": "images/bump.png"
    },
    {
      "word": "dump",
      "pattern": "1111",
      "image": "images/dump.png"
    },
    {
      "word": "hump",
      "pattern": "1111",
      "image": "images/hump.png"
    },
    {
      "word": "jump",
      "pattern": "1111",
      "image": "images/jump.png"
    },
    {
      "word": "lump",
      "pattern": "1111",
      "image": "images/lump.png"
    },
    {
      "word": "pump",
      "pattern": "1111",
      "image": "images/pump.png"
    },
    {
      "word": "rump",
      "pattern": "1111",
      "image": "images/rump.png"
    },
    {
      "word": "bust",
      "pattern": "1111",
      "image": "images/bust.png"
    },
    {
      "word": "dust",
      "pattern": "1111",
      "image": "images/dust.png"
    },
    {
      "word": "gust",
      "pattern": "1111",
      "image": "images/gust.png"
    },
    {
      "word": "just",
      "pattern": "1111",
      "image": "images/just.png"
    },
    {
      "word": "must",
      "pattern": "1111",
      "image": "images/must.png"
    },
    {
      "word": "rust",
      "pattern": "1111",
      "image": "images/rust.png"
    },
    {
      "word": "dusk",
      "pattern": "1111",
      "image": "images/dusk.png"
    },
    {
      "word": "husk",
      "pattern": "1111",
      "image": "images/husk.png"
    },
    {
      "word": "tusk",
      "pattern": "1111",
      "image": "images/tusk.png"
    },
    {
      "word": "duct",
      "pattern": "1111",
      "image": "images/duct.png"
    },
    {
      "word": "gulf",
      "pattern": "1111",
      "image": "images/gulf.png"
    },
    {
      "word": "gulp",
      "pattern": "1111",
      "image": "images/gulp.png"
    },
    {
      "word": "pulp",
      "pattern": "1111",
      "image": "images/pulp.png"
    }
  ]
};

// Flattened helpers for quick lookups / compatibility
const blendsWords = [
  "blab",
  "clad",
  "clap",
  "clan",
  "clam",
  "class",
  "Brad",
  "brag",
  "bran",
  "brass",
  "brat",
  "cram",
  "flag",
  "flap",
  "flat",
  "flax",
  "Fran",
  "frat",
  "glad",
  "glam",
  "glass",
  "grab",
  "grad",
  "gram",
  "grass",
  "plan",
  "slab",
  "slam",
  "slap",
  "slat",
  "scab",
  "scam",
  "scan",
  "snag",
  "snap",
  "span",
  "spat",
  "stab",
  "stat",
  "Stan",
  "swag",
  "swam",
  "crab",
  "drag",
  "tram",
  "trap",
  "band",
  "land",
  "sand",
  "pant",
  "rant",
  "lamp",
  "damp",
  "ramp",
  "fast",
  "cast",
  "last",
  "mast",
  "past",
  "ask",
  "bask",
  "mask",
  "task",
  "raft",
  "act",
  "fact",
  "pact",
  "hand",
  "vast",
  "camp",
  "blip",
  "clip",
  "cliff",
  "flip",
  "slim",
  "slip",
  "snip",
  "spin",
  "spit",
  "skid",
  "skim",
  "skin",
  "skip",
  "skit",
  "swim",
  "swig",
  "brim",
  "brig",
  "crib",
  "drip",
  "grid",
  "grim",
  "grin",
  "grip",
  "grit",
  "prim",
  "trim",
  "trip",
  "wind",
  "hint",
  "mint",
  "tint",
  "limp",
  "wimp",
  "fist",
  "list",
  "mist",
  "disk",
  "risk",
  "gift",
  "lift",
  "rift",
  "milk",
  "silk",
  "kilt",
  "tilt",
  "fled",
  "Glen",
  "sled",
  "sped",
  "step",
  "stem",
  "prep",
  "bend",
  "send",
  "lend",
  "tend",
  "bent",
  "vent",
  "lent",
  "sent",
  "hemp",
  "temp",
  "best",
  "nest",
  "pest",
  "rest",
  "test",
  "vest",
  "west",
  "desk",
  "left",
  "kept",
  "wept",
  "self",
  "help",
  "yelp",
  "belt",
  "felt",
  "melt",
  "pelt",
  "welt",
  "held",
  "helm",
  "blob",
  "blog",
  "blot",
  "clod",
  "clop",
  "clot",
  "flog",
  "flop",
  "glob",
  "glop",
  "plod",
  "plot",
  "plop",
  "slob",
  "slop",
  "slot",
  "smog",
  "snob",
  "snot",
  "spot",
  "stop",
  "crop",
  "croc",
  "frog",
  "prom",
  "prop",
  "trot",
  "trod",
  "bond",
  "fond",
  "pond",
  "font",
  "romp",
  "cost",
  "lost",
  "loft",
  "soft",
  "opt",
  "golf",
  "club",
  "bluff",
  "flub",
  "glum",
  "glug",
  "plug",
  "plum",
  "plus",
  "slug",
  "slum",
  "smug",
  "snub",
  "snug",
  "spud",
  "spun",
  "stub",
  "stun",
  "swum",
  "drug",
  "drum",
  "grub",
  "fund",
  "bunt",
  "hunt",
  "punt",
  "runt",
  "bump",
  "dump",
  "hump",
  "jump",
  "lump",
  "pump",
  "rump",
  "bust",
  "dust",
  "gust",
  "just",
  "must",
  "rust",
  "dusk",
  "husk",
  "tusk",
  "duct",
  "gulf",
  "gulp",
  "pulp"
];
const blendsImages = {
  "blab": "images/blab.png",
  "clad": "images/clad.png",
  "clap": "images/clap.png",
  "clan": "images/clan.png",
  "clam": "images/clam.png",
  "class": "images/class.png",
  "Brad": "images/brad.png",
  "brag": "images/brag.png",
  "bran": "images/bran.png",
  "brass": "images/brass.png",
  "brat": "images/brat.png",
  "cram": "images/cram.png",
  "flag": "images/flag.png",
  "flap": "images/flap.png",
  "flat": "images/flat.png",
  "flax": "images/flax.png",
  "Fran": "images/fran.png",
  "frat": "images/frat.png",
  "glad": "images/glad.png",
  "glam": "images/glam.png",
  "glass": "images/glass.png",
  "grab": "images/grab.png",
  "grad": "images/grad.png",
  "gram": "images/gram.png",
  "grass": "images/grass.png",
  "plan": "images/plan.png",
  "slab": "images/slab.png",
  "slam": "images/slam.png",
  "slap": "images/slap.png",
  "slat": "images/slat.png",
  "scab": "images/scab.png",
  "scam": "images/scam.png",
  "scan": "images/scan.png",
  "snag": "images/snag.png",
  "snap": "images/snap.png",
  "span": "images/span.png",
  "spat": "images/spat.png",
  "stab": "images/stab.png",
  "stat": "images/stat.png",
  "Stan": "images/stan.png",
  "swag": "images/swag.png",
  "swam": "images/swam.png",
  "crab": "images/crab.png",
  "drag": "images/drag.png",
  "tram": "images/tram.png",
  "trap": "images/trap.png",
  "band": "images/band.png",
  "land": "images/land.png",
  "sand": "images/sand.png",
  "pant": "images/pant.png",
  "rant": "images/rant.png",
  "lamp": "images/lamp.png",
  "damp": "images/damp.png",
  "ramp": "images/ramp.png",
  "fast": "images/fast.png",
  "cast": "images/cast.png",
  "last": "images/last.png",
  "mast": "images/mast.png",
  "past": "images/past.png",
  "ask": "images/ask.png",
  "bask": "images/bask.png",
  "mask": "images/mask.png",
  "task": "images/task.png",
  "raft": "images/raft.png",
  "act": "images/act.png",
  "fact": "images/fact.png",
  "pact": "images/pact.png",
  "hand": "images/hand.png",
  "vast": "images/vast.png",
  "camp": "images/camp.png",
  "blip": "images/blip.png",
  "clip": "images/clip.png",
  "cliff": "images/cliff.png",
  "flip": "images/flip.png",
  "slim": "images/slim.png",
  "slip": "images/slip.png",
  "snip": "images/snip.png",
  "spin": "images/spin.png",
  "spit": "images/spit.png",
  "skid": "images/skid.png",
  "skim": "images/skim.png",
  "skin": "images/skin.png",
  "skip": "images/skip.png",
  "skit": "images/skit.png",
  "swim": "images/swim.png",
  "swig": "images/swig.png",
  "brim": "images/brim.png",
  "brig": "images/brig.png",
  "crib": "images/crib.png",
  "drip": "images/drip.png",
  "grid": "images/grid.png",
  "grim": "images/grim.png",
  "grin": "images/grin.png",
  "grip": "images/grip.png",
  "grit": "images/grit.png",
  "prim": "images/prim.png",
  "trim": "images/trim.png",
  "trip": "images/trip.png",
  "wind": "images/wind.png",
  "hint": "images/hint.png",
  "mint": "images/mint.png",
  "tint": "images/tint.png",
  "limp": "images/limp.png",
  "wimp": "images/wimp.png",
  "fist": "images/fist.png",
  "list": "images/list.png",
  "mist": "images/mist.png",
  "disk": "images/disk.png",
  "risk": "images/risk.png",
  "gift": "images/gift.png",
  "lift": "images/lift.png",
  "rift": "images/rift.png",
  "milk": "images/milk.png",
  "silk": "images/silk.png",
  "kilt": "images/kilt.png",
  "tilt": "images/tilt.png",
  "fled": "images/fled.png",
  "Glen": "images/glen.png",
  "sled": "images/sled.png",
  "sped": "images/sped.png",
  "step": "images/step.png",
  "stem": "images/stem.png",
  "prep": "images/prep.png",
  "bend": "images/bend.png",
  "send": "images/send.png",
  "lend": "images/lend.png",
  "tend": "images/tend.png",
  "bent": "images/bent.png",
  "vent": "images/vent.png",
  "lent": "images/lent.png",
  "sent": "images/sent.png",
  "hemp": "images/hemp.png",
  "temp": "images/temp.png",
  "best": "images/best.png",
  "nest": "images/nest.png",
  "pest": "images/pest.png",
  "rest": "images/rest.png",
  "test": "images/test.png",
  "vest": "images/vest.png",
  "west": "images/west.png",
  "desk": "images/desk.png",
  "left": "images/left.png",
  "kept": "images/kept.png",
  "wept": "images/wept.png",
  "self": "images/self.png",
  "help": "images/help.png",
  "yelp": "images/yelp.png",
  "belt": "images/belt.png",
  "felt": "images/felt.png",
  "melt": "images/melt.png",
  "pelt": "images/pelt.png",
  "welt": "images/welt.png",
  "held": "images/held.png",
  "helm": "images/helm.png",
  "blob": "images/blob.png",
  "blog": "images/blog.png",
  "blot": "images/blot.png",
  "clod": "images/clod.png",
  "clop": "images/clop.png",
  "clot": "images/clot.png",
  "flog": "images/flog.png",
  "flop": "images/flop.png",
  "glob": "images/glob.png",
  "glop": "images/glop.png",
  "plod": "images/plod.png",
  "plot": "images/plot.png",
  "plop": "images/plop.png",
  "slob": "images/slob.png",
  "slop": "images/slop.png",
  "slot": "images/slot.png",
  "smog": "images/smog.png",
  "snob": "images/snob.png",
  "snot": "images/snot.png",
  "spot": "images/spot.png",
  "stop": "images/stop.png",
  "crop": "images/crop.png",
  "croc": "images/croc.png",
  "frog": "images/frog.png",
  "prom": "images/prom.png",
  "prop": "images/prop.png",
  "trot": "images/trot.png",
  "trod": "images/trod.png",
  "bond": "images/bond.png",
  "fond": "images/fond.png",
  "pond": "images/pond.png",
  "font": "images/font.png",
  "romp": "images/romp.png",
  "cost": "images/cost.png",
  "lost": "images/lost.png",
  "loft": "images/loft.png",
  "soft": "images/soft.png",
  "opt": "images/opt.png",
  "golf": "images/golf.png",
  "club": "images/club.png",
  "bluff": "images/bluff.png",
  "flub": "images/flub.png",
  "glum": "images/glum.png",
  "glug": "images/glug.png",
  "plug": "images/plug.png",
  "plum": "images/plum.png",
  "plus": "images/plus.png",
  "slug": "images/slug.png",
  "slum": "images/slum.png",
  "smug": "images/smug.png",
  "snub": "images/snub.png",
  "snug": "images/snug.png",
  "spud": "images/spud.png",
  "spun": "images/spun.png",
  "stub": "images/stub.png",
  "stun": "images/stun.png",
  "swum": "images/swum.png",
  "drug": "images/drug.png",
  "drum": "images/drum.png",
  "grub": "images/grub.png",
  "fund": "images/fund.png",
  "bunt": "images/bunt.png",
  "hunt": "images/hunt.png",
  "punt": "images/punt.png",
  "runt": "images/runt.png",
  "bump": "images/bump.png",
  "dump": "images/dump.png",
  "hump": "images/hump.png",
  "jump": "images/jump.png",
  "lump": "images/lump.png",
  "pump": "images/pump.png",
  "rump": "images/rump.png",
  "bust": "images/bust.png",
  "dust": "images/dust.png",
  "gust": "images/gust.png",
  "just": "images/just.png",
  "must": "images/must.png",
  "rust": "images/rust.png",
  "dusk": "images/dusk.png",
  "husk": "images/husk.png",
  "tusk": "images/tusk.png",
  "duct": "images/duct.png",
  "gulf": "images/gulf.png",
  "gulp": "images/gulp.png",
  "pulp": "images/pulp.png"
};
