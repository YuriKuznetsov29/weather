import { StoryFn } from '@storybook/react'
export const withLocalStorage = (Story: StoryFn) => {
    localStorage.setItem('currentLocation', '{"lat":64.4165,"lon":40.8122,"city":"Новодвинск","timezone":"Europe/Moscow","country":"Россия"}')
    localStorage.setItem('recentLocation', '[{"lat":64.4165,"lon":40.8122,"city":"Новодвинск","timezone":"Europe/Moscow","country":"Россия"},{"lat":40.4165,"lon":-3.70256,"city":"Мадрид","timezone":"Europe/Madrid","country":"Испания"},{"lat":69.26423,"lon":33.82597,"city":"Гранитный","timezone":"Europe/Moscow","country":"Россия"}]')
    return <Story />
}