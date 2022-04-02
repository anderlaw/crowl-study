const { execSync } = require('child_process');
const fs = require("fs");
const path = require('path')
const Filters = {
    New: ["AsmrEarCleaning", "AsmrStickySlime", "AsmrEarBrushing", "AsmrFallingBeads", "AsmrDriedHerbs", "AsmrSlime", "AsmrBubbleWrap", "AsmrEarBlowing", "AsmrEarMassage", "AsmrMicScratching"],
    AllTag: ["Birds", "River", "Rain", "Ocean", "Night", "AsmrVinylCrackle", "Flute", "Winds", "WhiteNoise", "Eternity", "MusicBox", "Lounge", "Shower", "Piano", "Orchestral", "Waterfall", "Thunder", "SpokenBreathing", "AsmrBedSheets", "BrainScanner", "Zen", "Campfire", "Melody", "CanadianForest", "Lakeshore", "WalkingInWoods", "AsmrSlime", "AsmrStickySlime", "Bumblebees", "Chicks", "Chickens", "Cows", "Dolphins", "Ducks", "HorsesTrotting", "MorningBirdsong", "SheepWalking", "TropicalBirds", "AirConditioner", "Dishwasher", "AsmrPageTurning", "CoffeeShop", "Autumn", "UprightPiano", "BrownNoise", "PinkNoise", "AsmrFizzyDrink", "LaserBeam", "ComputerBeeps", "OuterSpace", "RocketEngine", "WalkingInSpaceship", "HeartBeat", "Astral", "Fountain", "Train", "AsmrFoam", "Tribal", "India", "UrbanRain", "Cavern", "Reactor", "WindChimes", "Spaceship", "AsmrMakeupBrush", "Sailing", "Voices", "Watching", "BassMusic", "SpokenSleepAffirmations", "ColdRattle", "AsmrElvishWhispers", "Chirp", "Orbit", "Drum", "ServerRoom", "Storm", "AsmrBoilingWater", "Flute2", "Choir", "Airplane", "Starfield", "SunnyDay", "Guitar", "AsmrWriting", "Dramatic", "Butterfly", "Medieval", "EarthDrama", "Dreams", "AsmrIceCube", "WindSurge", "Forest", "Abstract", "BabyShusher", "GreenNoise", "MilkyWay", "AsmrEarMassage", "AsmrEarBlowing", "Spring", "AsmrFingerFlutter", "Toskana", "City", "Sprinkler", "SlowWaves", "LightRain", "AsmrSkillet", "HeavyRain", "RainyDay", "AsmrBubbleWrap", "Underwater", "TibetanBowlSmall", "TibetanBowlMedium", "TibetanBowlBig", "AsmrPurring", "Immersed", "Afternoon", "Rainstorm", "ForestRain", "Whales", "Seaside", "IcySnow", "AsmrDriedHerbs", "CuckooBird", "Aquarium", "BambooWaterFountain", "BathFilling", "AsmrMicScratching", "BoilingPotion", "DrivingInRain", "FloatingBoat", "HotTub", "RainOnWindow", "WavesOnRocks", "Whales2", "Seagulls", "RainOnRoof", "Duduk", "Playground", "AsmrRainDrops", "Owls", "Humming", "GrandfatherClock", "Frogs", "Dryer", "CatPurring", "BaliMist", "Thunderstorm", "CityAmbience", "IndianDrums", "PachelbelCanon", "Wolf", "FogHorn", "Vacuum", "Loon", "Keyboard", "MonkChant", "AsmrWalkingOnSnow", "OscillatingFan", "Womb", "BabyMarimba", "SpokenHypnoticWords", "BabyBells", "SingingBowlSmall", "SingingBowlMedium", "SingingBowlBig", "Jupiter", "Cicadas", "WindInTrees", "Peepers", "AsmrEarBrushing", "RustlingLeaves", "Crowd", "RainOnTent", "TibetanBowls", "BrahmsLullaby", "SpokenCountingSheep", "Joy", "Rattle", "LappingWater", "AsmrFallingBeads", "DistantTrain", "MagicChimes", "Carnival", "TruckEngine", "SweetDreams", "AsmrEarCleaning", "HairDryer", "SweetHourPrayer", "Ancestral", "FireCrackles", "Highway", "Om", "Harmony", "Binaural2.5hz", "Binaural4hz", "Binaural5hz", "Binaural8hz", "Binaural10hz", "Binaural20hz", "Isochronic2.5hz", "Isochronic4hz", "Isochronic5hz", "Isochronic8hz", "Isochronic10hz", "Isochronic20hz", "Solfeggio174hz", "Solfeggio285hz", "Solfeggio396hz", "Solfeggio417hz", "Solfeggio432hz", "Solfeggio528hz"],
    Spoken: ["SpokenBreathing", "SpokenSleepAffirmations", "SpokenHypnoticWords", "SpokenCountingSheep"],
    Water: ["River", "Ocean", "Rain", "Waterfall", "UrbanRain", "Cavern", "SlowWaves", "HeavyRain", "RainyDay", "Underwater", "Rainstorm", "RainOnRoof", "IcySnow", "Aquarium", "BambooWaterFountain", "BathFilling", "BoilingPotion", "DrivingInRain", "FloatingBoat", "HotTub", "RainOnWindow", "WavesOnRocks", "Immersed", "Seaside", "LappingWater", "Fountain", "Sailing", "LightRain", "ForestRain", "Lakeshore", "RainOnTent", "Shower", "Dishwasher"],
    Nature: ["Winds", "Thunder", "Campfire", "Night", "Storm", "Toskana", "CanadianForest", "WalkingInWoods", "Afternoon", "Thunderstorm", "Jupiter", "WindInTrees", "FireCrackles", "HeartBeat", "SunnyDay", "WindSurge", "Forest", "RustlingLeaves"],
    City: ["UrbanRain", "RainOnRoof", "GrandfatherClock", "CityAmbience", "OscillatingFan", "Vacuum", "Crowd", "Highway", "Train", "DistantTrain", "ColdRattle", "Aquarium", "BathFilling", "DrivingInRain", "HotTub", "Sprinkler", "Playground", "Dryer", "FogHorn", "Keyboard", "Carnival", "TruckEngine", "HairDryer", "Shower", "AirConditioner", "Dishwasher", "CoffeeShop"],
    Melodies: ["Flute", "Lounge", "Piano", "Orchestral", "Zen", "Melody", "WindChimes", "Butterfly", "Medieval", "Humming", "Duduk", "MonkChant", "Eternity", "Astral", "Tribal", "India", "Voices", "Watching", "BassMusic", "Drum", "Flute2", "Choir", "Guitar", "Dramatic", "EarthDrama", "Dreams", "Abstract", "Spring", "City", "BaliMist", "IndianDrums", "PachelbelCanon", "MagicChimes", "SweetHourPrayer", "Ancestral", "Harmony", "Om", "TibetanBowlSmall", "TibetanBowlMedium", "TibetanBowlBig", "SingingBowl", "SingingBowlMedium", "SingingBowlBig", "Joy", "MilkyWay", "Orbit", "Starfield", "Autumn", "UprightPiano"],
    Animal: ["Bumblebees", "Chicks", "Chickens", "Cows", "Dolphins", "Ducks", "HorsesTrotting", "MorningBirdsong", "SheepWalking", "TropicalBirds", "Birds", "Frogs", "CatPurring", "CuckooBird", "Peepers", "Chirp", "Whales2", "Whales", "Seagulls", "Owls", "Wolf", "Loon", "Cicadas"],
    ASMR: ["AsmrVinylCrackle", "AsmrBedSheets", "AsmrPageTurning", "AsmrFizzyDrink", "AsmrFoam", "AsmrMakeupBrush", "AsmrElvishWhispers", "AsmrBoilingWater", "AsmrWriting", "AsmrIceCube", "AsmrFingerFlutter", "AsmrSkillet", "AsmrPurring", "AsmrRainDrops", "AsmrEarCleaning", "AsmrStickySlime", "AsmrEarBrushing", "AsmrFallingBeads", "AsmrDriedHerbs", "AsmrSlime", "AsmrBubbleWrap", "AsmrEarBlowing", "AsmrEarMassage", "AsmrMicScratching", "AsmrWalkingOnSnow"],
    Noise: ["WhiteNoise", "BrownNoise", "PinkNoise", "Spaceship", "Airplane", "GreenNoise", "AirConditioner"],
    Baby: ["Humming", "BrahmsLullaby", "MusicBox", "Womb", "SweetDreams", "BabyBells", "BabyShusher", "BabyMarimba", "Rattle"],
    SciFi: ["BrainScanner", "ComputerBeeps", "OuterSpace", "RocketEngine", "WalkingInSpaceship", "LaserBeam", "Jupiter", "Reactor", "Jupiter", "Spaceship", "ServerRoom"],
    Brainwave: ["Isochronic10hz", "Isochronic20hz", "Isochronic2.5hz", "Isochronic4hz", "Isochronic5hz", "Isochronic8hz", "Binaural10hz", "Binaural20hz", "Binaural2.5hz", "Binaural4hz", "Binaural5hz", "Binaural8hz", "Solfeggio174hz", "Solfeggio285hz", "Solfeggio396hz", "Solfeggio417hz", "Solfeggio432hz", "Solfeggio528hz"]
}
/**
 *
 */
const failedList = []
const successList = []
for(let category in Filters){
    const curMusicList = Filters[category]
    for(let musicName of curMusicList){
        if(successList.indexOf(musicName) > -1){
            continue;
        }
        const targetAssetsDir = './resources'
        if(!fs.existsSync(targetAssetsDir)){
            fs.mkdirSync(path.join(__dirname,targetAssetsDir))
        }
        const assetsBaseUrl = 'https://my.bettersleep.com/assets/sounds'
        try{
            const buffer = execSync(`curl ${assetsBaseUrl}/${musicName}.ogg`,{
                //最大可使用1GB的缓存内存
                maxBuffer:1024*1024*1024
            })
            const dataBuffer = new Buffer(buffer.toString(), 'base64');
            fs.writeFileSync(`${targetAssetsDir}/${musicName}.ogg`,dataBuffer);
            // fs.writeFileSync(`${targetAssetsDir}/${musicName}.ogg`,dataBuffer);
            successList.push(musicName)
            console.log(`success:${musicName}`)
        }catch (e){
            failedList.push(musicName)
            console.error(`failed:${musicName}`)
        }
    }
}

//将成功日志写入文件 success-log.txt
fs.writeFileSync('./success-log.txt',successList.join('\n'));
//将失败日志写入文件 failed-log.txt
fs.writeFileSync('./failed-log.txt',failedList.join('\n'));
