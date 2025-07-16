type Props = {
    text: string
}

function TextBlock({ text }: Props) {
    return (
        <div className="bg-secondary px-4 py-2">
            <span className="text-xl text-white text-shadow-lg">
                {text}
            </span>
        </div>
    )
}

export default TextBlock;
