const books = [
    { 
        id: 1, 
        author: 'Leo Tolstoy', 
        title: 'War and Peace', 
        available: true, 
        description: "Often considered the greatest novel ever written, this is world literature's defining epic, and the first novel to achieve something unprecedented: merging intimate human drama with historical philosophy. Its genius establishes the idea that the smallest personal drama – a girl's first dance, a prisoner sharing bread – carry equal weight to Napoleon’s campaigns. In a world in tumult, historical forces test the individual will. Fiction can contain the sweep of history and the flutter of a single heart.",
        category: 'Historical Fiction'
    },
    { 
        id: 2, 
        author: 'George Eliot', 
        title: "Middlemarch", 
        available: false, 
        description: "George Eliot revolutionised the novel by presenting a complete social web of human relationships with unprecedented psychological depth. Its greatness lies in showing how private lives and social forces interweave, while its intimate portrayal of intellectual women's struggles for meaning created a new kind of psychological realism. It's considered the peak of Victorian fiction because it captured both individual consciousness and society's moral fabric with unmatched sophistication.",
        category: 'Historical Fiction'
    },
    { 
        id: 3, 
        author: 'Mary Shelley', 
        title: "Frankenstein", 
        available: false, 
        description: "Considered the first modern myth and a foundational text of science fiction, Mary Shelley’s novel – written when she was just 19 –  transcends genre. Its revolutionary impact stems from Shelley's fusion of Gothic romance and Enlightenment philosophy, creating a new kind of novel that unpicks the ethical implications of scientific progress. What makes it canonical isn't just its influence on sci-fi, but how it captured humanity's eternal struggle with ambition, creator versus created, and the price of pushing beyond natural limits.",
        category: 'Science Fiction'
    },
    { 
        id: 4, 
        author: 'Henry James', 
        title: 'Portrait of a Lady', 
        available: false, 
        description: "This book marks the moment the novel became truly psychological, with James's detailed exploration of consciousness, perception and choice. Its mastery lies in showing how an independent mind navigates social constraints, while revolutionising narrative technique through psychological intimacy. It's essential because it pushed fiction beyond plot into the territory of pure consciousness.",
        category: 'Classics'
    },
    { 
        id: 5, 
        author: 'James Joyce', 
        title: 'Finnegans Wake', 
        available: false, 
        description: "Modernism's foundational text was published on the eve of WW2 and remains an exceptional experiment in where language can go. What makes it essential isn't just its complexity, but how it reimagined what a novel could be: a dreamscape that captures the collective unconscious of human civilisation. A century-old novel that is perpetually avant-garde, which continues to shock new generations.",
        category: 'Modernist Literature'
    },
    { 
        id: 6, 
        author: 'Virginia Woolf', 
        title: 'Mrs Dalloway', 
        available: false, 
        description: "Woolf redefined narrative possibility by showing how a single day could contain a life's meaning. Its innovation lies in capturing an individual stream of consciousness while weaving social criticism with intimate psychological portraits. It's canonical for showing how modernist technique could illuminate both individual consciousness and societal trauma.",
        category: 'Modernist Literature'
    },
    { 
        id: 7, 
        author: 'Charlotte Perkins Gilman', 
        title: 'The Yellow Wallpaper', 
        available: false, 
        description: "The novel that redefined feminist literature by exposing how patriarchy uses the twin devices of marriage and medicalisation to manage and control women. It uses Gothic horror tropes to dramatise real experiences, making the personal political through masterful psychological suspense. Before gaslighting was invested as a term or misogyny outed in medical bias, Gilman's story illuminated how society's 'care' for women could be a form of imprisonment.",
        category: 'Feminist Literature'
    },
    { 
        id: 8, 
        author: 'Fyodor Dostoyevsky', 
        title: 'The Idiot', 
        available: false, 
        description: "Dostoevsky's most daring moral experiment placed pure goodness in a corrupt world. Its brilliance lies in exploring whether Christian love can survive in modern society, while pushing psychological realism to new depths, and producing an unmatched portrayal of moral consciousness and social corruption.",
        category: 'Philosophical Fiction'
    },
    { 
        id: 9, 
        author: 'Thomas Mann', 
        title: 'Buddenbrooks', 
        available: false, 
        description: "Mann redefined the family saga by showing how historical forces shape private lives. Its genius lies in depicting the decline of both a family and a social class with unprecedented psychological subtlety, capturing modernity's impact on tradition while portraying a vast sweep of history through multiple generations.",
        category: 'Historical Fiction'
    },
    { 
        id: 10, 
        author: 'H.G. Wells', 
        title: 'The Time Machine', 
        available: false, 
        description: "This novel transcended sci-fi to become a profound critique of progress and class. Its power lies in using time travel to expose Victorian social anxieties while creating a template for serious speculative fiction, showing for the first time how science fiction could carry serious social and philosophical weight.",
        category: 'Science Fiction'
    }
]
export default books