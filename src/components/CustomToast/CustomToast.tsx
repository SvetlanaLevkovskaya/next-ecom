import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const customToastSuccess = (text: string) => {
  return toast.success(text, {
    autoClose: 1500,
    icon: <FaCheckCircle style={{ color: '#14b8a6' }} />,
  })
}

export const customToastError = (text: string) => {
  return toast.error(text, {
    autoClose: 1500,
    icon: <FaTimesCircle style={{ color: '#f43f5e' }} />,
  })
}
