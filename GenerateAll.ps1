$nodejs = 'e:\program files\nodejs\node.exe'

$classSpecs = "death-knight_blood", "death-knight_frost", "death-knight_unholy", "demon-hunter_havoc", "demon-hunter_vengeance", "druid_balance", "druid_feral", "druid_guardian", "druid_restoration", "hunter_beast-mastery", "hunter_marksmanship", "hunter_survival", "mage_arcane", "mage_fire", "mage_frost", "monk_mistweaver", "monk_windwalker", "monk_brewmaster", "paladin_holy", "paladin_protection", "paladin_retribution", "priest_discipline", "priest_holy", "priest_shadow", "rogue_assassination", "rogue_outlaw", "rogue_subtlety", "shaman_elemental", "shaman_enhancement", "shaman_restoration", "warlock_affliction", "warlock_demonology", "warlock_destruction", "warrior_arms", "warrior_fury", "warrior_protection"
$minSkills = "TSA"
$maxSkills = "TPSAC"
foreach ($classSpec in $classSpecs) {
    $parts = $classSpec.Split("_")
    $classDir = ".\Specs\" + $parts[0]
    if(!(Test-Path -Path $classDir )){
        New-Item -Force -ItemType directory -Path $classDir
    }
    $minXmlFileName = $classDir + "\" + $classSpec + '-TSA.xml'
    $maxXmlFileName = $classDir + "\" + $classSpec + '-ALL.xml'
    $fullXmlFilename = $classDir + "\" + $parts[0] + '-ALL.xml'
    start-sleep -s 2
    #$progArgs = @('.\generateMacroSet.js', $minSkills, $parts[0], $parts[1], "NOFUNC" )
    #& $nodejs $progArgs > $minXmlFileName
    start-sleep -s 2
    $progArgs = @('.\generateMacroSet.js', $maxSkills, $parts[0], $parts[1])
    & $nodejs $progArgs > $maxXmlFileName
    #start-sleep -s 2
    #$progArgs = @('.\generateMacroSet.js', $maxSkills, $parts[0])
    #& $nodejs $progArgs > $fullXmlFilename
}