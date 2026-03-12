interface PropsOptions {
    value: string
    description: string
};

export const Option = ({value, description }: PropsOptions) => {
    return (
        <option
            style={{
              'background': '#000'
            }}
            value={value}>
                {description}
        </option>
    )
}