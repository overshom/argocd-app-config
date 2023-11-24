// test in browser console

const sequentialTesting = async () => {
    const reps = {};
    const start = Date.now();
    for (let i = 0; i < 400; i++) {
        const res = await fetch('');
        const text = await res.text();
        const id = +text.split('\n')[2]?.split(' ').pop();
        const already = reps[id] || 0;
        reps[id] = already + 1;
        console.log(text, id, reps);
    }
    const delta = Date.now() - start;
    console.log(reps, delta);
}

const parallelTesting = async () => {
    const reps = {};
    const start = Date.now();
    const arr = [];
    for (let i = 0; i < 400; i++) {
        const f = async () => {
            const res = await fetch('');
            const text = await res.text();
            const id = +text.split('\n')[2]?.split(' ').pop();
            const already = reps[id] || 0;
            reps[id] = already + 1;
            console.log(text, id, reps);
        };
        arr.push(f());
    }
    await Promise.all(arr);
    const delta = Date.now() - start;
    console.log(reps, delta);
}

/**
 * previous testing results
 * sequential requests:
 * - 1 replica:
 * -- 400 total requests
 * -- ~34 sec total duration
 * - 4 replicas:
 * -- same results
 * 
 * parallel requests:
 * - 1 replica:
 * -- 400 total requests
 * -- ~20 sec total duration
 * - 4 replicas:
 * -- same results
 */
