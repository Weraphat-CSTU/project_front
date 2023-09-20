import { Input, InputProps } from 'antd';
import React from 'react';

interface IProps extends Omit<InputProps, 'onChange'> {
    formatter: (val?: string | null) => string;
    onChange?: (val?: string | null) => void;
}

function inputWithFormatInner(
    { value, formatter, onChange, ...props }: IProps,
    ref: React.LegacyRef<any>,
): React.ReactElement {
    const parser = (val: string): string => val.replace(/$\s?|(\D*)/g, '');

    return (
        <Input
            {...props}
            ref={ref}
            value={formatter(value?.toString())}
            onChange={(e : any) => {
                return onChange && onChange(parser(e.target.value));
            }}
        />
    );
}

const InputWithFormat = React.forwardRef(inputWithFormatInner);

export default InputWithFormat;