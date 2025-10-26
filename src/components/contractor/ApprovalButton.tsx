import React from 'react'
import { CheckCircle, XCircle, Clock } from 'lucide-react'


type Status = 'pending' | 'approved' | 'rejected'

type Props = {
    status: Status
    onClick?: () => void
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    className?: string
    ariaLabel?: string
}

const ApprovalButton = ({
    status,
    onClick,
    size = 'md',
    disabled = false,
    className = '',
    ariaLabel,
}: Props) => {


    const base = 'inline-flex items-center gap-2 font-medium rounded-2xl shadow-sm transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2'

    const sizes: Record<string, string> = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-base',
    }

    const statusStyles: Record<Status, { bg: string; text: string; ring: string; icon: React.ReactNode }> = {
        pending: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-800',
            ring: 'focus:ring-yellow-300',
            icon: <Clock className="w-4 h-4" />,
        },
        approved: {
            bg: 'bg-green-50',
            text: 'text-green-800',
            ring: 'focus:ring-green-300',
            icon: <CheckCircle className="w-4 h-4" />,
        },
        rejected: {
            bg: 'bg-red-50',
            text: 'text-red-800',
            ring: 'focus:ring-red-300',
            icon: <XCircle className="w-4 h-4" />,
        },
    }

    const s = statusStyles[status]

    return (
        <>
            <button
                type="button"
                onClick={onClick}
                disabled={disabled}
                aria-pressed={status === 'approved'}
                aria-label={ariaLabel || `status-${status}`}
                title={status.charAt(0).toUpperCase() + status.slice(1)}
                className={`${base} ${sizes[size]} ${s.bg} ${s.text} ${s.ring} ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-[0.99]'} ${className} cursor-pointer`}
            >
                <span className="flex items-center">
                    <span className="mr-1">{s.icon}</span>
                    <span className="capitalize">{status}</span>
                </span>
            </button>

        </>
    )
}

export default ApprovalButton;