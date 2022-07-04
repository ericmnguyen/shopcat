interface ButtonProps {
  children: string;
  value: string;
  id: string;
  onClick: any;
}

const SelectButton = (props: ButtonProps) => {
  const { children, id, onClick, value='' } = props;
  
  return (
    <button
      id={id}
      onClick={onClick}
      className={value === id ?
        'text-white hover:text-white border border-gray-800 bg-gray-900 focus:bg-gray-900 hover:bg-gray-900 focus:outline-none font-medium rounded-full text-sm px-2 py-2 h-full w-full text-center mr-2 mb-2 dark:text-white dark:hover:text-white dark:focus:ring-gray-800':
        'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm px-2 py-2 h-full w-full text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800'
      }
    >
      {children}
    </button>
  )
}
export default SelectButton;
