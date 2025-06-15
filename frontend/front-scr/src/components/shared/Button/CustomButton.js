export default function CustomButton({ title, onClick }) {
	return (
		<div className="d-grid gap-4 mb-2">
			<button
				type="submit"
				className="btn btn-primary decorated-button shadow-lg"
				onClick={onClick}
			>
				{title}
			</button>
		</div>
	);
}
