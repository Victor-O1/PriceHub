import Image from 'next/image'
import React from 'react'

export default function PriceInfoCard({ title, iconSrc, value, borderColor }) {

    return (
        <div className="w-fit">
            <div className={`price-info_card border-l-[${borderColor}] `}>
                <p className="text-base text-black-100">{title}</p>
                <div className="flex gap-1">
                    <Image src={iconSrc} alt="icon" width={24} height={24} />
                    <p className="text-2xl font-bold text-secondary">{value}</p>
                </div>

            </div>
        </div>
    )
}

// beffc5