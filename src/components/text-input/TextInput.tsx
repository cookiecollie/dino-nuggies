interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = (props: TextInputProps) => {
    return <input {...props} className="input" />
}
