function getRandomInt(max, min = 0) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function getRandomPerson(N, y) {
    const person = new Array(N).fill(0)
    return person.map(() => getRandomInt(y/2))
}

function getFitness(arr, population, y) {
    return population.map((person) => {
        const sum = arr.reduce((acc, rec, index) => {
            return acc + rec * person[index]
        }, 0)
        return Math.abs(sum - y)
    })
}

function getProbabilities(fitness) {
    const sum = fitness.reduce((acc, rec) => {
        return acc + 1 / rec
    }, 0)
    return fitness.map((it) => 1/ (it * sum))
}

function getIndex(probabilities) {
    function sumBefore(arr, index) {
        let sum = 0
        for (let i = 0; i < index; i++) {
            sum = sum + arr[i]
        }
        return sum
    }
    const r = Math.random()
    const ind = probabilities.reduce((acc, rec, index, arr) => {
        if (acc === -1 && r < sumBefore(arr, index + 1)) return index
        return acc
    }, -1)
    return ind
}

function crossover(arr, probabilities) {
    const index1 = getIndex(probabilities)
    const index2 = getIndex(probabilities)
    const divider = getRandomInt(arr[0].length + 1)
    const firstHalf = arr[index1].slice(0, divider)
    const secondHalf = arr[index2].slice(divider, arr[0].length)
    return [...firstHalf, ...secondHalf]
}

function mutate(person) {
    const chance = 0.1
    return person.map((value) => {
        if (Math.random() < chance) {
            const r = getRandomInt(2, 1)
            if (r === 1) {
                return value + 1
            }
            return value - 1
        }
        return value
    })
}

function getNewPopulation(population, probabilities) {
    return population.map(() => {
        return mutate(crossover(population, probabilities))
    })
}

export function geneticAlgorithm(args) {
    const t0 = Date.now()
    if (!args[0]) return []
    const N = args.length - 1
    const p = new Array(N).fill(0)
    const y = args.pop()
    getRandomInt(y/2)
    let population = p.map(() => getRandomPerson(N, y))
    let answer = []
    let iterations = 0
    while (!answer.length) {
        iterations = iterations + 1
        const fitness = getFitness(args, population, y)
        const index = fitness.indexOf(0)
        if (fitness.indexOf(0) > -1) {
            answer = population[index]
            break
        }
        population = getNewPopulation(population, getProbabilities(fitness))
    }
    const t1 = Date.now()
    return [answer, iterations, t1 - t0]
}