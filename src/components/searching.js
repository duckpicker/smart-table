import {rules, createComparison} from "../lib/compare.js";

export function initSearching(elements, searchField) {
    // @todo: #5.1 — настроить компаратор
    const comparator = createComparison(
        [rules.skipEmptyTargetValues],                        // стандартное правило, пропускаем пустые
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)  // ищем в нескольких полях
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const query = state[searchField]?.toLowerCase() || '';
        if (!query) return data;   // если поле поиска пустое — возвращаем все данные

        return data.filter(item => comparator(item, { [searchField]: query }));
    }
}
