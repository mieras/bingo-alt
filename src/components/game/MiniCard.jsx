import React from 'react';
import { GRID_SIZE } from '../../utils/constants';
import vlbLogo from '../../assets/vlb-logo.png';

const MiniCard = ({ bingoCard, checkedNumbers }) => {
    return (
        <div
            className="absolute z-50"
            style={{
                transform: 'rotate(5deg)',
                bottom: '-2rem',
                right: '1rem',
            }}
        >
            {/* Red card holder */}
            <div
                className="flex flex-col justify-end items-center p-2 pt-1 pb-2 rounded"
                style={{
                    width: '90px',
                    height: '111px',
                    backgroundColor: '#E73358',
                    boxShadow: '0px 67px 80px 0px rgba(0,0,0,0.07), 0px 28px 33px 0px rgba(0,0,0,0.05), 0px 15px 18px 0px rgba(0,0,0,0.04), 0px 8px 10px 0px rgba(0,0,0,0.04), 0px 4px 5px 0px rgba(0,0,0,0.03), 0px 2px 2px 0px rgba(0,0,0,0.02)',
                }}
            >
                {/* Logo header */}
                <div
                    className="absolute top-[5px] left-2 right-2 bg-white rounded-t-md flex items-center justify-center"
                    style={{ height: '25px', padding: '2px 4px' }}
                >
                    <img
                        src={vlbLogo}
                        alt="VriendenLoterij Bingo"
                        className="object-contain w-full h-auto"
                        style={{ maxHeight: '20px' }}
                    />
                </div>

                {/* Mini Bingo Card */}
                <div
                    className="overflow-hidden bg-white"
                    style={{
                        width: '74px',
                        borderBottomLeftRadius: '37px',
                        borderBottomRightRadius: '37px',
                        paddingTop: '8px',
                        paddingBottom: '16px',
                        paddingLeft: '4px',
                        paddingRight: '4px',
                    }}
                >
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            gap: '0px',
                        }}
                    >
                        {bingoCard.map((num, idx) => {
                            const isChecked = num && checkedNumbers.has(num);
                            const isEmpty = idx === 10;

                            return (
                                <div
                                    key={idx}
                                    className="flex relative justify-center items-center border border-gray-100"
                                    style={{
                                        width: '16.5px',
                                        height: '13.5px',
                                        fontSize: '9px',
                                        fontWeight: 600,
                                        color: '#003884',
                                    }}
                                >
                                    {isEmpty ? (
                                        <svg
                                            width="6"
                                            height="6"
                                            viewBox="0 0 36 36"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle cx="18" cy="18" r="14" fill="#003884" fillOpacity="0.1" />
                                        </svg>
                                    ) : (
                                        <>
                                            <span className="relative z-10">{num < 10 ? `0${num}` : num}</span>
                                            {isChecked && (
                                                <div
                                                    className="flex absolute inset-0 z-0 justify-center items-center"
                                                >
                                                    <div
                                                        className="rounded-full"
                                                        style={{
                                                            width: '14px',
                                                            height: '14px',
                                                            backgroundColor: '#B9E2E5',
                                                            opacity: 0.8,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniCard;
