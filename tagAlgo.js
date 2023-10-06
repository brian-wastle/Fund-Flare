let tags = [
    "five",
    "one",
    "four",
    "three",
    "three",
    "three",
    "one",
    "one",
    "one",
    "two",
    "two",
    "two",
    "two",
    "two",
    "two",
    "two",
    "four",
    "four",
    "four",
    "four",
    "four",
    "four",
    "four",
]

function weightTags(tags) {
    const tagWeights = {};
    let weightSeed = Math.random() * 12

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        if (!tagWeights[tag]) {
            tagWeights[tag] = 0;
        }
        tagWeights[tag] += 1 / (i + (weightSeed * Math.random() * 2));
    }

    const weightedTags = Object.keys(tagWeights).map(tag => ({
        tag: tag,
        weight: parseFloat(tagWeights[tag].toFixed(4))
    }));

    weightedTags.sort((a, b) => b.weight - a.weight);

    return weightedTags;
}

const tagCounts = {};
for (let i = 0; i < 10000; i++) {
    const preferredTag = weightTags(tags)[0].tag;
    if (!tagCounts[preferredTag]) {
        tagCounts[preferredTag] = 0;
    }
    tagCounts[preferredTag]++;
}
for (const tag in tagCounts) {
    const percentage = (tagCounts[tag] / 10000) * 100;
    console.log(`${tag} - ${percentage.toFixed(2)}%`);
}