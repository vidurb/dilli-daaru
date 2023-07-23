export type ExciseApiBrand = {
    brandKey: number
    brandId: string
    brandName: string
    liquorType: "Indian Liquor" | "Foreign Liquor" | "Country Liquor"
    liquorCategory: "Alcopop" | "Beer" | "Brandy" | "Country Liquor" | "Draught Beer" | "Gin" | "Liqueur" | "Mixed Alcoholic Beverages" | "Rum" | "Vodka" | "Whisky" | "Wine"
    warehouse: string
    status: "Y"
    brandAvailabilityDate: Date | null
    mrp: number
}

export type ExciseApiVendor = {
    vendId: string
    entityName: string
    entityType: "Corporation Vend"
    licenceId: string
    timing: string
    entityAddress: string
    district: "CENTRAL DELHI" | "EAST DELHI" | "NEW DELHI" | "NORTH DELHI" | "NORTH EAST DELHI" | "NORTH WEST DELHI" | "SOUTH DELHI" | "SOUTH WEST DELHI" | "WEST DELHI"
    serveForeignLiquor: "Y" | "N"
    clFlag: "Y" | "N"
    ilFlag: "Y" | "N"
    flFlag: "Y" | "N"
    liquorType: "CL" | "IL" | "IL,CL" | "IL,FL"
    entitySubTye: "DSIIDC" | "DCCWS" | "DSCSC" | "DTTDC"
    brandAvailibilty: []
}