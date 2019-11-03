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
