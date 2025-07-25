import { useRef, useState } from "react";
import StringSelect from "../../EditeableFields/StringSelect";
import { SKILLS } from "../../Globals/Skills";

export default function SkillEntry({ defaultContent, onDelete, onChange}) {

	const [editing, setEditing] = useState(false);

	//keys: id, skillName, bonus
	const [skillData, setSkillData] = useState(defaultContent)

	const skillName = useRef(skillData.skillName);
	const bonus = useRef(skillData.bonus);

	function doneEditing() {

		let newData = {
			id: defaultContent.id,
			skillName: skillName.current,
			bonus:bonus.current
		}
		setEditing(false);

		setSkillData(newData);
		onChange(defaultContent.id, newData);
	}

	if (editing) {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<StringSelect defaultValue={skillName.current} options={SKILLS} onUpdate={selected => {
					skillName.current = selected;
				}} />
				<p className="ml-4">+</p>
				<input
					type="text"
					inputMode="numeric"
					autoFocus
					maxLength="2"
					className="w-6 pl-1 text-left"
					defaultValue={bonus.current}
					onChange={e => {
						bonus.current = e.target.value;
					}}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							doneEditing();
						}
					}}
					/>
				<div className="w-full" />
				<img src="./icons/ui/check_icon.png" className="self-center" onClick={() => doneEditing()}/>
			</div>
		)
	} else {
		return (
		<div style={{ display: "flex", flexDirection: "row" }} >
			<p className="w-60 text-left">{skillName.current}:</p>
			<p className="w-full text-left">+{bonus.current}</p>
			<img src="./icons/ui/delete_icon.png" className="self-center" onClick={() => onDelete(defaultContent.id)} />
			<img src="./icons/ui/wrench_icon.png" className="self-center" onClick={() => setEditing(true)}/>
		</div>
		)
	}
}