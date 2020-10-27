## Beeq's Ultimate Macro Set Generator
node .\generateMacroSet.js (options) (class) [spec] [key-options] > your-file-name.xml

### Usage examples:
node .\generateMacroSet.js ALL Warlock Affliction > warlock-affliction.xml
node .\generateMacroSet.js ASTP Priest > priest.xml
node .\generateMacroSet.js AST Monk Mistweaver NOFUNC > monk-mistweaver.xml
node .\generateMacroSet.js ASTCNP Demon-Hunter Havoc > dh-havoc.xml

#### OPTIONS (Required)
- T - Talents
- P - PVP
- S - Specialization
- A - Abilities
- C - Covenant Abilities
- N - Anima Powers
- ALL - All of the above

If selecting specific types of skills, combine individual characters (i.e. TSA, TPSA, TSACN)
Use ALL to include all skills

#### CLASSES (Required)
death-knight, demon-hunter, druid, hunter, mage, monk, paladin, priest, rogue, shaman, warlock, warrior

##### SPECS [Optional]
affliction, arcane, arms, assassination, balance, beast-mastery, blood, brewmaster, demonology, destruction, discipline, elemental, enhancement, feral, fire, frost, fury, guardian, havoc, holy, marksmanship, mistweaver, outlaw, protection, restoration, retribution, shadow, subtlety, survival, unholy, vengeance, windwalker

##### Key Options [Optional]
Leave blank to use modifiers (ctrl,alt,shift) with the following keys:
NUM keys, F1-F9, HOME, END, PGUP, PGDN

Pass NOFUNC to exclude the F1-F9 keys.

##### Regenerating the XML
If you want to regenerate the XML files in the Specs/ folder, you can use the included PowerShell script, *GenerateAll.ps1*.

Please note that you will need to modify the first line of this file.  Set the value of _$nodejs_ to where your Node.exe location.

Anima Powers are not included in the ALL XML files. If you want these included change
_$maxSkills = "TPSAC"_ to _$maxSkills = "TPSACN"_

