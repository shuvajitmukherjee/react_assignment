export default class Constants {
    static questionSets: any[] = [
        {
            sentences: [
                'Jen lost her mittens at King School.',
                'Kids sing all day at Camp Quest.',
                'We saw bass in Bells Pond.',
                'Mel will make props for the play.'
            ],
            correctMarkers: [
                {
                    'type': 'word-highlight',
                    'idx': [[0, 5, 6], [5, 6], [4, 5], [0]]
                },
                {
                    'type': 'word-underline',
                    'idx': [[3], [0, 3], [2], [3, 6]]
                },
                {
                    'type': 'letter-highlight',
                    'idx': [[{
                        wordIdx: 0,
                        charIdx: 2
                    },
                    {
                        wordIdx: 2,
                        charIdx: 1
                    }]]
                },
                {
                    'type': 'letter-divide',
                    'idx': [[]]
                }
            ]
        },
        {
            sentences: [
                'I have to cook dinner today.',
                'Tom lived in Japan for ten years.',
                'I do not know if he will visit us next Sunday.'
            ],
            correctMarkers: [
                {
                    'type': 'word-highlight',
                    'idx': [[1, 3], [2, 3], [4]]
                },
                {
                    'type': 'word-underline',
                    'idx': [[3], [0, 3], [2]]
                },
                {
                    'type': 'letter-highlight',
                    'idx': [[{
                        wordIdx: 0,
                        charIdx: 2
                    },
                    {
                        wordIdx: 2,
                        charIdx: 1
                    }]]
                },
                {
                    'type': 'letter-divide',
                    'idx': [[]]
                }
            ]
        },
        {
            sentences: [
                'He studied English history.',
                'He is used to mountain climbing.',
                'She left her umbrella in the train.'
            ],
            correctMarkers: [
                {
                    'type': 'word-highlight',
                    'idx': [[2, 3], [0], [3]]
                },
                {
                    'type': 'word-underline',
                    'idx': [[4], [1, 2], [4]]
                },
                {
                    'type': 'letter-highlight',
                    'idx': [[{
                        wordIdx: 0,
                        charIdx: 2
                    },
                    {
                        wordIdx: 2,
                        charIdx: 1
                    }]]
                },
                {
                    'type': 'letter-divide',
                    'idx': [[]]
                }
            ]
        }
    ];
}