export interface IGroupedOption {
  label: string
  options: IOption[]
  demandLevel: number
}

export interface IOption {
  value: string
  label: string
  category: string
  period: string
  targetValue?: number
  isDisabled?: boolean
}

export const createGroupedOptions = (userLevel: number): IGroupedOption[] => {
  const selfDemandLevel = 1
  const healthDemandLevel = 1
  const sportsDemandLevel = 4
  const educationDemandLevel = 10

  const selfOptions: IOption[] = [
    { value: 'self', label: 'Описать привычку самостоятельно', category: 'self', period: 'self', isDisabled: userLevel < selfDemandLevel }
  ]

  const healthOptions: IOption[] = [
    {
      value: 'healthyFood',
      label: 'Полезное питание в течение всего дня',
      category: 'Здоровье',
      period: 'daily',
      isDisabled: userLevel < healthDemandLevel
    },
    {
      value: 'water',
      label: '5000мл. воды в день',
      category: 'Здоровье',
      period: 'daily',
      targetValue: 5000,
      isDisabled: userLevel < healthDemandLevel
    },
    { value: 'sleepEarly', label: 'Ложиться спать до 23:00', category: 'Здоровье', period: 'daily', isDisabled: userLevel < healthDemandLevel },
    { value: 'noSmoke', label: 'Не курить', category: 'Здоровье', period: 'daily', isDisabled: userLevel < healthDemandLevel },
    { value: 'noAlcohol', label: 'Не пить алкоголь', category: 'Здоровье', period: 'daily', isDisabled: userLevel < healthDemandLevel }
  ]

  const sportsOptions: IOption[] = [
    { value: 'morningCharge', label: 'Утренняя зарядка', category: 'Спорт', period: 'daily', isDisabled: userLevel < sportsDemandLevel },
    { value: 'gym', label: '3 тренировки в неделю', category: 'Спорт', period: 'weekly', targetValue: 3, isDisabled: userLevel < sportsDemandLevel },
    { value: 'yoga', label: 'Ежедневная йога', category: 'Спорт', period: 'daily', isDisabled: userLevel < sportsDemandLevel },
    { value: 'walking', label: '10 000 шагов в день', category: 'Спорт', period: 'daily', isDisabled: userLevel < sportsDemandLevel }
  ]

  const educationOptions: IOption[] = [
    {
      value: 'programming',
      label: 'Познавать программирование каждый день',
      category: 'Образование',
      period: 'daily',
      isDisabled: userLevel < educationDemandLevel
    },
    {
      value: 'studying',
      label: 'Учеба 4 часа в день',
      category: 'Образование',
      period: 'daily',
      targetValue: 4,
      isDisabled: userLevel < educationDemandLevel
    },
    {
      value: 'reading',
      label: 'Читать 1 книгу в месяц',
      category: 'Образование',
      period: 'monthly',
      targetValue: 1,
      isDisabled: userLevel < educationDemandLevel
    },
    {
      value: 'breath',
      label: 'Ежедневные дыхательные практики и аффирмации)',
      category: 'Образование',
      period: 'daily',
      isDisabled: userLevel < educationDemandLevel
    }
  ]

  const groupedOptions: IGroupedOption[] = [
    {
      label: '',
      options: selfOptions,
      demandLevel: selfDemandLevel
    },
    {
      label: 'Здоровье',
      options: healthOptions,
      demandLevel: healthDemandLevel
    },
    {
      label: 'Спорт',
      options: sportsOptions,
      demandLevel: sportsDemandLevel
    },
    {
      label: 'Образование',
      options: educationOptions,
      demandLevel: educationDemandLevel
    }
  ]
  return groupedOptions
}
