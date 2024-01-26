import { ProductCategory } from '@prisma/client'
import { title } from 'radash'

import styles from '@/styles/product-category-select.module.scss'

export function ProductCategorySelect({
    category,
    handleSelect,
    handleOnlySelect,
    defaultChecked,
}: {
    category: ProductCategory
    handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOnlySelect: (category: ProductCategory) => void
    defaultChecked: boolean
}) {
    return (
        <div className={styles.category}>
            <label
                htmlFor={category.toLowerCase()}
                className={styles.categoryLabel}
            >
                <input
                    type="checkbox"
                    id={category.toLowerCase()}
                    value={category}
                    checked={defaultChecked}
                    onChange={handleSelect}
                />
                {title(category.toLowerCase())}
            </label>
            <button onClick={() => handleOnlySelect(category)}>only</button>
        </div>
    )
}
