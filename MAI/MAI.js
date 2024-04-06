import * as math from 'mathjs';
import {Matrix, re} from 'mathjs';

/**
 * @param matrix {Matrix}
 * @return {Matrix}
 * */
const normalizeMatrix = ({matrix}) => {
    if (!matrix) {
        throw new Error(`Empty matrix`);
    }
    const amountOfRows = matrix.size()[0];
    const amountOfColumns = matrix.size()[1];
    const normalizedMatrix = [];

    const sumsOfColumns = [];
    for (let j = 0; j < amountOfColumns; j++) {
        let sum = 0;
        for (let i = 0; i < amountOfRows; i++) {
            sum += matrix.get([i, j]);
        }
        sumsOfColumns.push(sum);
    }

    for (let i = 0; i < amountOfRows; i++) {
        const rowAveragedByColumn = matrix._data[i].map((element, columnIndex) => element / sumsOfColumns[columnIndex]);
        normalizedMatrix.push(rowAveragedByColumn);
    }

    return math.matrix(normalizedMatrix);
}

/**
 * @param matrix {Matrix}
 * @return {Array<number>}
 * */
const getRowAverages = ({matrix}) => {
    const rowAverages = [];
    const amountOfRows = matrix.size()[0];
    const amountOfColumns = matrix.size()[1];
    for (let i = 0; i < amountOfRows; i++) {
        let sum = 0;
        for (let j = 0; j < amountOfColumns; j++) {
            sum += matrix.get([i, j]);
        }
        rowAverages.push(sum / amountOfColumns);
    }
    return rowAverages;
}

/**
 * @param matrix {Matrix}
 * @param nameByRowIndexSupplier {({ rowIndex: number}) => string}
 * @return {WeightVector}
 * */
const getWeights = ({matrix, nameByRowIndexSupplier}) => {
    const normalizedMatrix = normalizeMatrix({matrix});
    const rowAverages = getRowAverages({matrix: normalizedMatrix});
    return rowAverages.map((value, rowIndex) => ({
        weight: value,
        rowName: nameByRowIndexSupplier({rowIndex}),
    }));
}

/**
 * @param alternatives {Alternatives}
 * @return {({ rowIndex: number }) => string}
 * */
const getAlternativesNameSupplier = ({ alternatives }) => ({ rowIndex }) => {
    return Object.values(alternatives).find(a => a.ordinal === rowIndex)?.name || `Unknown alternative with ordinal = ${rowIndex}`;
}

/**
 * @param pairwiseComparisonOfAlternativesByCriteria {PairwiseComparisonOfAlternativesByCriteria}
 * @param alternatives {Alternatives}
 * @return {CriteriaNamesToWeights}
 * */
const getCriteriaNamesToWeightsForAlternatives = ({
                                                      pairwiseComparisonOfAlternativesByCriteria,
                                                      alternatives
                                                  }) => {
    const alternativesNameSupplier = getAlternativesNameSupplier({ alternatives });
    const result = {};
    for (const criteriaName of Object.keys(pairwiseComparisonOfAlternativesByCriteria)) {
        const matrix = pairwiseComparisonOfAlternativesByCriteria[criteriaName];
        result[criteriaName] = getWeights({
            matrix,
            nameByRowIndexSupplier: alternativesNameSupplier,
        });
    }
    return result;
}

/**
 * @param criteriaWeights {WeightVector}
 * @param criteriaNamesToWeightsForAlternatives {CriteriaNamesToWeights}
 * @param alternatives {Alternatives}
 * @return {WeightVector}
 * */
const getAlternativeWeights = ({
                                   criteriaWeights,
                                   criteriaNamesToWeightsForAlternatives,
                                    alternatives,
}) => {
    const criteriaSortedByName = [...criteriaWeights].sort((c1, c2) => c1.name < c2.name ? -1 : 1);
    const criteriaWeightsForAlternativesColumns = [];
    for (const criteria of criteriaSortedByName) {
        const column = criteriaNamesToWeightsForAlternatives[criteria.rowName];
        const columnWeights = column.map(c => c.weight);
        criteriaWeightsForAlternativesColumns.push(columnWeights);
    }
    const criteriaWeightsForAlternativesMatrix = math.transpose(math.matrix(criteriaWeightsForAlternativesColumns));
    const criteriaWeightsVector = math.matrix(criteriaSortedByName.map(c => [c.weight]));
    const alternativeWeights = math.multiply(criteriaWeightsForAlternativesMatrix, criteriaWeightsVector);

    const alternativesNameSupplier = getAlternativesNameSupplier({ alternatives });
    return alternativeWeights._data.map((weights, rowIndex) => ({
        weight: weights[0],
        rowName: alternativesNameSupplier({ rowIndex }),
    }))
}

/**
 * @param criteria {Criteria}
 * @return {({ rowIndex: number }) => string}
 * */
const getCriteriaNameSupplier = ({ criteria }) => ({ rowIndex }) => {
    return Object.values(criteria).find(c => c.ordinal === rowIndex)?.name || `Unknown criteria with ordinal = ${rowIndex}`;
}

/**
 * @param config {MAIConfig}
 * @return {{
 *     criteriaWeights: WeightVector,
 *     criteriaNamesToWeightsForAlternatives: CriteriaNamesToWeights,
 *     alternativeWeights: WeightVector,
 * }}
 * */
export const solveWithMAI = ({config}) => {
    const criteriaNameSupplier = getCriteriaNameSupplier({ criteria: config.criteria });
    const criteriaWeights = getWeights({
        matrix: config.pairwiseComparisonOfCriteriaImportanceMatrix,
        nameByRowIndexSupplier: criteriaNameSupplier,
    });
    const criteriaNamesToWeightsForAlternatives = getCriteriaNamesToWeightsForAlternatives({
        pairwiseComparisonOfAlternativesByCriteria: config.pairwiseComparisonOfAlternativesByCriteria,
        alternatives: config.alternatives,
    });
    const alternativeWeights = getAlternativeWeights({
        criteriaWeights,
        criteriaNamesToWeightsForAlternatives,
        alternatives: config.alternatives,
    });

    return {
        criteriaWeights,
        criteriaNamesToWeightsForAlternatives,
        alternativeWeights,
    }
}
