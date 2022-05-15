import { classNames } from '../../libs/helper';

export function CustomButton({
    children,
    handler = null,
    isSubmit = false,
    classes,
    disabled = false,
}) {
    return (
        <button
            disabled={disabled}
            type={isSubmit ? 'submit' : 'button'}
            className={classNames(
                disabled ? 'bg-gray-300' : 'bg-sky-600 hover:bg-sky-700',
                'group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white ',
                classes
            )}
            onClick={handler}>
            {children}
        </button>
    );
}

export function PaginationButton({
    children,
    handler = null,
    isSubmit = false,
    classes,
}) {
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={classNames(
                'group relative flex justify-center w-fit py-2 px-4 border border-transparent text-sm font-medium text-white bg-sky-600 hover:bg-sky-700',
                classes
            )}
            onClick={handler}>
            {children}
        </button>
    );
}

