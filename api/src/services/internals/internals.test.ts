import {
  internals,
  internal,
  createInternal,
  updateInternal,
  deleteInternal,
} from './internals'
import type { StandardScenario } from './internals.scenarios'

describe('internals', () => {
  scenario('returns all internals', async (scenario: StandardScenario) => {
    const result = await internals()

    expect(result.length).toEqual(Object.keys(scenario.internal).length)
  })

  scenario('returns a single internal', async (scenario: StandardScenario) => {
    const result = await internal({ id: scenario.internal.one.id })

    expect(result).toEqual(scenario.internal.one)
  })

  scenario('creates a internal', async () => {
    const result = await createInternal({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a internal', async (scenario: StandardScenario) => {
    const original = await internal({ id: scenario.internal.one.id })
    const result = await updateInternal({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a internal', async (scenario: StandardScenario) => {
    const original = await deleteInternal({ id: scenario.internal.one.id })
    const result = await internal({ id: original.id })

    expect(result).toEqual(null)
  })
})
