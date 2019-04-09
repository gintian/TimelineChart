$(document).ready(function () {

    $('#chart').timeline({
        data: chartData,
        classes: classes,
        config: { showToday: true },
        labels: true
    });

});

const chartData = [
    {
        title: 'Project #1',
        color: '#FFFFE0',
        height: 150,
        single: [
            {
                date: '2015-01-01',
                title: 'task 1',
                class: 'stagegate'
            },
            {
                date: '2015-03-01',
                title: 'task 2',
                class: 'milestone'
            },
            {
                date: '2015-06-01',
                title: 'task 3',
                class: 'stagegate'
            },
            {
                date: '2015-09-01',
                title: 'task 4',
                class: 'stagegate'
            },
            {
                date: '2015-12-01',
                title: 'task 5',
                class: 'task'
            }
        ],
        range: [
            {
                start: '2015-01-01',
                end: '2015-02-14',
                task: 'Gathering requirements',
                class: 'activity'
            },
            {
                start: '2015-04-16',
                end: '2015-05-27',
                task: 'Producing specifications',
                class: 'activity'
            },
            {
                start: '2015-05-01',
                end: '2015-07-18',
                task: 'Development',
                class: 'activity'
            },
            {
                start: '2015-06-18',
                end: '2015-12-30',
                task: 'Testing and QA',
                class: 'activity'
            }
        ]
    },
    {
        title: 'Project #2',
        color: '#98FB98',
        height: 300,
        single: [
            {
                date: '2015-02-01',
                title: 'task2 1',
                class: 'stagegate'
            },
            {
                date: '2015-04-01',
                title: 'task2 2',
                class: 'stagegate'
            },
            {
                date: '2015-07-01',
                title: 'task2 3',
                class: 'milestone'
            },
            {
                date: '2015-10-01',
                title: 'task2 4',
                class: 'task'
            },
            {
                date: '2015-11-01',
                title: 'task2 5',
                class: 'stagegate'
            }
        ],
        range: [
            {
                start: '2015-01-01',
                end: '2015-02-14',
                task: '2. Gathering requirements',
                class: 'activity'
            },
            {
                start: '2015-04-16',
                end: '2015-05-27',
                task: '2. Producing specifications',
                class: 'activity'
            },
            {
                start: '2015-07-05',
                end: '2015-09-18',
                task: '2. Development',
                class: 'activity'
            },
            {
                start: '2015-11-18',
                end: '2015-12-30',
                task: '2. Testing and QA',
                class: 'activity'
            }
        ]
    },
    {
        title: 'Project #3',
        color: '#E0FFFF',
        height: 100,
        single: [
            {
                date: '2015-01-01',
                title: 'task2 1',
                class: 'task'
            },
            {
                date: '2015-02-01',
                title: 'task2 2',
                class: 'milestone'
            },
            {
                date: '2015-03-01',
                title: 'task2 3',
                class: 'milestone'
            },
            {
                date: '2016-01-01',
                title: 'task2 4',
                class: 'stagegate'
            },
            {
                date: '2016-02-01',
                title: 'task2 5',
                class: 'stagegate'
            }
        ],
        range: [
            {
                start: '2015-01-01',
                end: '2015-05-14',
                task: '2. Gathering requirements',
                class: 'activity'
            },
            {
                start: '2015-04-16',
                end: '2015-10-27',
                task: '2. Producing specifications',
                class: 'activity'
            },
            {
                start: '2015-07-05',
                end: '2015-09-18',
                task: '2. Development',
                class: 'activity'
            },
            {
                start: '2016-01-18',
                end: '2016-02-30',
                task: '2. Testing and QA',
                class: 'activity'
            }
        ]
    }
];

const classes = {
    milestone: {
        image: 'images/SVG/rhombus_teal.svg',
        width: 15,
        height: 15
    },
    task: {
        image: 'images/SVG/star_red.svg',
        width: 15,
        height: 15
    },
    stagegate: {
        image: 'images/SVG/circle_yellow.svg',
        width: 15,
        height: 15
    },
    activity: {
        pattern: 'images/SVG/arrows_components/arrow_middle_red.svg',
        before: 'images/SVG/arrows_components/arrow_end_red.svg',
        after: 'images/SVG/arrows_components/arrow_tip_red.svg',
        beforeWidth: 16,
        beforeHeight: 15,
        afterWidth: 14,
        afterHeight: 15,
        patternHeight: 15
    }
};