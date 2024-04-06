/**
 * @param goal {string}
 * */
export const prettyPrintGoal = ({
                                    goal
                                }) => {
    console.log(`Our goal: ${goal}`);
    console.log();
}

/**
 * @param vector {WeightVector}
 * @param descriptions {string}
 * @param weightNameSupplier {({ rowName: string }) => string}
 * @param endDelimiter {string | undefined}
 * */
export const prettyPrintWeightVector = ({
                                            vector,
                                            description,
                                            weightNameSupplier,
                                            endDelimiter = undefined,
                                        }) => {
    console.log(description);

    for (const weightDto of vector) {
        const name = weightNameSupplier({rowName: weightDto.rowName});
        console.log(`> ${name}: ${Number(weightDto.weight * 100).toFixed(2)}%`);
    }
    if (endDelimiter) {
        console.log(endDelimiter);
    }
};


/**
 * @param vector {WeightVector}
 * @param criteriaNamesToWeightsForAlternatives {CriteriaNamesToWeights}
 * @param alternativeNameSupplier {({ rowName: string }) => string}
 * @param criteriaNameSupplier {({ rowName: string }) => string}
 * @param endDelimiter {string | undefined}
 * */
export const prettyPrintCriteriaNamesToWeightsForAlternatives = ({
                                                                     criteriaNamesToWeightsForAlternatives,
                                                                     description,
                                                                     alternativeNameSupplier,
                                                                     criteriaNameSupplier,
                                                                     endDelimiter = undefined,
                                                                 }) => {
    console.log(description);
    for (const criteriaName of Object.keys(criteriaNamesToWeightsForAlternatives)) {
        const displayName = criteriaNameSupplier({rowName: criteriaName});

        prettyPrintWeightVector({
            vector: criteriaNamesToWeightsForAlternatives[criteriaName],
            description: `\t* ${displayName}:`,
            weightNameSupplier: alternativeNameSupplier,
        })
    }
    if (endDelimiter) {
        console.log(endDelimiter);
    }
};

