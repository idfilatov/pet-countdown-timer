const addDays = 0;
const addHours = 1;
const addMinutes = 5;
const addSeconds = 0;

const shiftToTarget = addSeconds * 1000 + addMinutes * 1000 * 60 + addHours * 1000 * 60 * 60 + addDays * 1000 * 60 * 60 * 24;

const targetDate = Date.now() + shiftToTarget;
console.log(`targetDate: ${new Date(targetDate)}`);

const getFormattedTimeDelta = (timeDelta) => {

    // const days = Math.floor(timeDelta / (1000 * 60 * 60 * 24));
    // const hours = Math.floor(timeDelta % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    // const mins = Math.floor(timeDelta % (1000 * 60 * 60) / (1000 * 60));
    // const secs = Math.floor(timeDelta % (1000 * 60) / 1000);

    const days = Math.floor(timeDelta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDelta / (1000 * 60 * 60) - days * 24);
    const mins = Math.floor(timeDelta / (1000 * 60) - hours * 60);
    const secs = Math.floor(timeDelta / (1000) - hours * 3600 - mins * 60);

    return { days, hours, mins, secs }
}

setInterval(() => {
    const currentDate = Date.now();
    const timeDelta = (targetDate - currentDate);  //now in secs
    const { days, hours, mins, secs } = getFormattedTimeDelta(timeDelta);

    console.log(`Delta: ${days} days, ${hours} hours, ${mins} mins, ${secs} secs`)
}, 1000);