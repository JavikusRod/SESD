import {
  externals,
  external,
  createExternal,
  updateExternal,
  deleteExternal,
} from './externals'
import type { StandardScenario } from './externals.scenarios'

describe('externals', () => {
  scenario('returns all externals', async (scenario: StandardScenario) => {
    const result = await externals()

    expect(result.length).toEqual(Object.keys(scenario.external).length)
  })

  scenario('returns a single external', async (scenario: StandardScenario) => {
    const result = await external({ id: scenario.external.one.id })

    expect(result).toEqual(scenario.external.one)
  })

  scenario('creates a external', async () => {
    const result = await createExternal({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a external', async (scenario: StandardScenario) => {
    const original = await external({ id: scenario.external.one.id })
    const result = await updateExternal({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a external', async (scenario: StandardScenario) => {
    const original = await deleteExternal({ id: scenario.external.one.id })
    const result = await external({ id: original.id })

    expect(result).toEqual(null)
  })
})
