let tags = [
    "three",
    "two",
    "one",
    "one",
    "one",
    "one",
    "two",
    "two",
    "two",
    "three",
    "two",
    "three",
    "three",
    "two",
    "two",
    "three",
    "three",
];

function weightTags(tags) {
    const tagWeights = {};

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (!tagWeights[tag]) {
            tagWeights[tag] = 0;
        }
        tagWeights[tag] += 1 / (i + 20);
    }

    const weightedTags = Object.keys(tagWeights).map(tag => ({
        tag: tag,
        weight: parseFloat(tagWeights[tag].toFixed(4))
    }));

    weightedTags.sort((a, b) => b.weight - a.weight);

    return weightedTags;
}

console.log(weightTags(tags));
console.log(`users preferred tag: ${weightTags(tags)[0].tag}`);