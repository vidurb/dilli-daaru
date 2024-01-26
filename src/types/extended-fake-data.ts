import { faker } from '@faker-js/faker'

import { ExtendedVendor } from '@/lib'
import { fakeVendorComplete } from '@/types/fake-data'

export function fakeVendorExtended(): ExtendedVendor {
    return {
        ...fakeVendorComplete(),
        dist_meters: faker.number.int(),
        location: {
            type: 'Point',
            coordinates: [125.6, 10.1],
        },
    }
}
