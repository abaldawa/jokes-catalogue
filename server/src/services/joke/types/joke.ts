interface IJoke {
  id: string;
  title: string;
  lang: string;
  length: string;
  text: string;
  tags: string[];
  clean: null;
  racial: null;
}

interface Contents {
  jokes: IJoke[];
  copyright: string;
}

interface Success {
  total: number;
}

interface Joke {
  success: Success;
  contents: Contents;
}

export { Joke };
