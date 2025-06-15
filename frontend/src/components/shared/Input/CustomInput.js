export default function CustomInput({
	id,
	type,
	value,
	onChange,
	placeholder,
	isRequired,
}) {
	return (
		<input
			type={type}
			id={id}
			className="form-control input-group input-group-sm mb-1"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required={isRequired}
		/>
	);
}
