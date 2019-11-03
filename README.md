# Node NLP utilities

## Cli
### nlp-lower-case
Transform input to lower case
#### Install
```
npm i -g @petitchevalroux/cli-lower-case
```
#### Usage
```
echo "To Lower Case" | nlp-lower-case 
to lower case
```
### nlp-remove-diacritics
Remove diacritics from input
#### Install
```
npm i -g @petitchevalroux/cli-remove-diacritics
```
#### Usage
```
echo "ça va Élodie" | nlp-remove-diacritics 
ca va Elodie
```
### nlp-tokenize-words
Tokenize input string to words
#### Install
```
npm i -g @petitchevalroux/cli-tokenize-words
```
#### Usage
```
echo "First line" && echo "Second line" && echo "mille-pattes" | nlp-tokenize-words
First line
Second line
mille
patte
```

### Sample usage
#### Getting words sorted by frequencies
```
cat samples/tire-corpus.txt | nlp-lower-case | nlp-remove-diacritics | nlp-tokenize-words | sort | uniq -c | sort -n -r -k 1
26534 pneu
10245 tl
8350 xl
4714 m
4592 roue
4582 c
4513 arriere
3990 diagonal
3642 radial
3503 avant
3372 michelin
2990 tt
2853 pirelli
2807 5
2626 bridgestone
2548 continental
...
```
