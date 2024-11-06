import React, { useEffect, useRef, useState } from 'react';
import Stack from '../Stack'
import IconButton from '../IconButton';
import IconKeyboardArrowRight from 'naxui-icons/round/KeyboardArrowRight';
import IconKeyboardArrowLeft from 'naxui-icons/round/KeyboardArrowLeft';
import Text from '../Text';
import Button from '../Button';
import ResetIcon from 'naxui-icons/round/Replay';
import ViewBox from '../ViewBox';
import { useColorTemplateColors } from 'naxui-manager';

export type CalendarProps = {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    viewMode?: "year" | "month" | "day";
    onButtonClick?: (mode: CalendarProps["viewMode"], value: CalendarProps["value"]) => void;
    color?: useColorTemplateColors;
}


const ShowYears = ({ color, year, today, boxWidth, onClick }: any) => {
    let years: any[] = []
    const selectedRef: any = useRef()
    for (let y = 1900; y < today.getFullYear() + 40; y++) {
        const selected = year == y
        years.push(<Stack
            key={y}
            width={(boxWidth - 12) / 3}
            alignItems="center"
            justifyContent="center"
            p={.1}
            className='calender-year-item'
        >
            <Button
                color={selected ? color : "default"}
                className='calender-year-button'
                size='small'
                corner="circle"
                ref={selected ? selectedRef : null}
                onClick={() => onClick(y)}
                variant={selected ? "fill" : "text"}
            >
                {y}
            </Button>
        </Stack>)
    }

    useEffect(() => {
        if (selectedRef?.current) {
            selectedRef?.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        }
    }, [])

    return (
        <Stack
            flexWrap="wrap"
            flexRow
            overflow="hidden"
            overflowY="auto"
            className='calender-years'
        >
            {years}
        </Stack>
    )
}


const Calendar = ({ value, onChange, viewMode: VMode, onButtonClick, color }: CalendarProps) => {
    let [viewMode, setViewMode] = useState<any>(VMode || "day");
    let [selectedDate, setSelectedDate] = useState(new Date());
    selectedDate = value instanceof Date ? value : selectedDate
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = 32 - new Date(year, month, 32).getDate()
    const today = new Date();
    const btnWidth = 32
    const boxWidth = btnWidth * 7
    color ??= "brand"

    const showCalendar = () => {

        let firstDay = (new Date(year, month)).getDay();
        let rows = []

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = []
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    row.push(<Stack
                        width={btnWidth}
                        height={btnWidth}
                        alignItems="center"
                        justifyContent="center"
                        key={date + j + i}
                    >
                    </Stack>)
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let isToday = date === today.getDate() && year === today.getFullYear() && month === today.getMonth()
                    let isSelected = date === selectedDate.getDate() && year === selectedDate.getFullYear() && month === selectedDate.getMonth()

                    let css: any = {}
                    if (isToday) {
                        css = {
                            variant: "outline",
                            color: color
                        }
                    }

                    if (isSelected) {
                        css = {
                            variant: "fill",
                            color: color
                        }
                    }

                    row.push(<Stack
                        width={btnWidth}
                        height={btnWidth}
                        alignItems="center"
                        justifyContent="center"
                        key={date + j + i}
                        className='calender-day-item'
                    >
                        <IconButton
                            className='calender-day-button'
                            variant={isSelected ? "fill" : "text"}
                            color={isToday ? color : "default"}
                            {...css}
                            data-value={date}
                            onClick={(e: any) => {
                                let d = e.target.getAttribute("data-value")
                                if (!d) return
                                let selectedDate = new Date(year, month, parseInt(d))
                                onChange ? onChange(selectedDate) : setSelectedDate(selectedDate)
                                onButtonClick && onButtonClick("day", selectedDate)
                            }}
                        >
                            {date}
                        </IconButton>
                    </Stack>)
                    date++;
                }
            }
            rows.push(<Stack flexRow key={"row" + i} className='calender-day-row'>
                {row}
            </Stack>);
        }
        return rows
    }

    const showMonth = () => {
        let months: any[] = []
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (let m = 0; m < monthNames.length; m++) {
            const selected = currentDate.getMonth() === m

            months.push(<Stack
                key={m}
                width={(boxWidth - 12) / 2}
                alignItems="center"
                justifyContent="center"
                p={.1}
                className='calender-months-item'
            >
                <Button
                    color={selected ? color : "default"}
                    className='calender-month-button'
                    size='small'
                    corner="circle"
                    variant={selected ? "fill" : 'text'}
                    onClick={() => {
                        const v = new Date(currentDate.getFullYear(), m)
                        setCurrentDate(v)
                        setViewMode("day")
                        onButtonClick && onButtonClick("month", v)
                    }}
                    sxr={{
                        color: selected ? "brand.text" : "text.primary"
                    }}
                >
                    {monthNames[m]}
                </Button>
            </Stack>)
        }


        return (
            <Stack
                flexWrap="wrap"
                flexRow
                overflow="hidden"
                overflowY="auto"
                className='calender-months'
            >
                {months}
            </Stack>
        )
    }

    let view: any = null
    switch (viewMode) {
        case "year":
            view = <ShowYears
                color={color}
                today={today}
                year={year}
                boxWidth={boxWidth}
                onClick={(y: any) => {
                    currentDate.setFullYear(y)
                    setCurrentDate(currentDate)
                    setViewMode("month")
                    onButtonClick && onButtonClick("year", currentDate)
                }}
            />
            break;
        case "month":
            view = showMonth()
            break;
        default:
            view = (<>
                <Stack flexRow className='calender-week-container'>
                    {
                        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                            <Stack
                                key={day + idx}
                                width={btnWidth}
                                height={btnWidth}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    fontWeight={500}
                                    fontSize="button"
                                    color="text.secondary"
                                >
                                    {day}
                                </Text>
                            </Stack>
                        ))
                    }
                </Stack>
                {showCalendar()}
            </>
            )
            break;
    }

    return (
        <ViewBox
            className='calender-root'
            maxHeight={308}
            width={boxWidth + 12}
            radius={1}
            bgcolor="background.primary"
            startContent={
                <Stack className='calender-header' flexRow alignItems="center" justifyContent="space-between" p={1}>
                    <Text
                        fontWeight="bold"
                        cursor="pointer"
                        onClick={() => setViewMode(viewMode !== 'day' ? "day" : "year")}
                        flex={1}
                    >
                        {currentDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                    </Text>
                    <IconButton
                        color="default"
                        variant='text'
                        size={28}
                        onClick={() => {
                            setCurrentDate(new Date())
                            onChange ? onChange(new Date()) : setSelectedDate(new Date())
                        }}
                    >
                        <ResetIcon fontSize={20} />
                    </IconButton>
                    <IconButton
                        color="default"
                        variant='text'
                        size={28}
                        onClick={() => {
                            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
                        }}
                    >
                        <IconKeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        color="default"
                        variant='text'
                        size={28}
                        onClick={() => {
                            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
                        }}
                    >
                        <IconKeyboardArrowRight />
                    </IconButton>
                </Stack>
            }
        >
            <Stack height="100%" p={.5} className='calender-container'>
                {view}
            </Stack>
        </ViewBox>
    );
};

export default Calendar;