import {solveWithMAI} from "./MAI/MAI.js";
import {configuration} from "./config/config.js";
import {
    prettyPrintCriteriaNamesToWeightsForAlternatives,
    prettyPrintGoal,
    prettyPrintWeightVector
} from "./printer/printer.js";

const criteriaDisplayNameSupplier = ({ rowName }) => configuration.criteria[rowName]?.displayName || `Unknown criteria: ${rowName}`;

const alternativeDisplayNameSupplier = ({ rowName }) => configuration.alternatives[rowName]?.displayName || `Unknown alternative: ${rowName}`;


const main = () => {
    const result = solveWithMAI({ config: configuration });

    prettyPrintGoal({ goal: configuration.goal });
    prettyPrintWeightVector({
        vector: result.criteriaWeights,
        description: 'The importance of each criteria:',
        weightNameSupplier: criteriaDisplayNameSupplier,
        endDelimiter: '========================================================='
    });
    prettyPrintCriteriaNamesToWeightsForAlternatives({
        description: 'How well each alternative fits each criteria:',
        criteriaNamesToWeightsForAlternatives: result.criteriaNamesToWeightsForAlternatives,
        alternativeNameSupplier: alternativeDisplayNameSupplier,
        criteriaNameSupplier: criteriaDisplayNameSupplier,
        endDelimiter: '=========================================================',
    });
    prettyPrintWeightVector({
        vector: result.alternativeWeights,
        description: 'How suitable the alternatives are for the given goal:',
        weightNameSupplier: alternativeDisplayNameSupplier,
        endDelimiter: '=========================================================',
    });
}

main();
