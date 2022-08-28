const addDays = 0;
const addHours = 0;
const addMinutes = 0;
const addSeconds = 10;

const shiftToTarget = addSeconds * 1000 + addMinutes * 1000 * 60 + addHours * 1000 * 60 * 60 + addDays * 1000 * 60 * 60 * 24;

const dom = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    mins: document.getElementById('mins'),
    secs: document.getElementById('secs'),
}

const timeLimits = {
    days: 365,
    hours: 24,
    mins: 60,
    secs: 60,
}
const timeScale = {
    days: 6.05,
    hours: 0.4,
    mins: 1,
    secs: 1,
}

const targetDate = Date.now() + shiftToTarget;
// console.log(`targetDate: ${new Date(targetDate)}`);

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

const changeCircle = (elem, key, value) => {
    const style = elem.style;
    style.strokeDasharray = `${value / timeScale[key]} 60`;
    // if (value === 0) {
    //     style.strokeLinecap = 'butt';
    // }
    style.strokeLinecap = value > 0 ? 'round' : 'initial';
}

const renderTime = (timeDelta, dom) => {
    Object.keys(timeDelta).forEach(key => {
        const segment = dom[key].querySelector('.segment')
        dom[key].querySelector('.timer__num').innerHTML = timeDelta[key];
        changeCircle(segment, key, timeDelta[key]);
    })
}

const countdown = setInterval(() => {
    const currentDate = Date.now();
    const timeDelta = (targetDate - currentDate);  //now in secs
    if (timeDelta <= 0) {
        clearInterval(countdown);
    } else {
        const formattedTime = getFormattedTimeDelta(timeDelta);
        renderTime(formattedTime, dom);
    }

}, 1000);