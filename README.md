# Ŀ¼

- [����](#����)
- [��������](#��������)
  - [��װ������](#��װ������)
  - [��ʼ������](#��ʼ������)
- [��Լ](#��Լ)
  - [��Լ��ʼ�����ӿڵ���](#��Լ��ʼ�����ӿڵ���)
  - [��ԼAPI](#��ԼAPI)
    - [StakingContract](#StakingContract)
      - [staking](#staking-������Ѻ)
      - [updateStakingInfo](#updateStakingInfo-�޸���Ѻ��Ϣ)
      - [unStaking](#unStaking-������Ѻ)
      - [addStaking](#addStaking-������Ѻ)
      - [GetStakingInfo](#GetStakingInfo-��ȡ��Ѻ��Ϣ)
    - [NodeContract](#NodeContract)
      - [GetVerifierList](#GetVerifierList-��ѯ��ǰ�������ڵ���֤�˶���)
      - [getValidatorList](#getValidatorList-��ѯ��ǰ��ʶ���ڵ���֤���б�)
      - [getCandidateList](#getCandidateList-��ѯ����ʵʱ�ĺ�ѡ���б�)
    - [DelegateContract](#DelegateContract)
      - [delegate](#delegate-����ί��)
      - [withdrewDelegate](#withdrewDelegate-����ί��)
      - [GetRelatedListByDelAddr](#GetRelatedListByDelAddr-��ѯ��ǰ�˻���ַ��ί�еĽڵ��NodeID����ѺId)
      - [GetDelegateInfo](#GetDelegateInfo-��ѯ��ǰ����ί����Ϣ)
    - [ProposalContract](#ProposalContract)
      - [submitText](#submitText-�ύ�ı��᰸)
      - [submitParam](#submitParam-�ύ�����᰸)
      - [submitVersion](#submitVersion-�ύ�����᰸)
      - [vote](#vote-���᰸ͶƱ)
      - [declareVersion](#declareVersion-�汾����)
      - [getProposal](#getProposal-��ѯ�᰸)
      - [listProposal](#listProposal-��ѯ�᰸�б�)
      - [getTallyResult](#getTallyResult-��ѯ�᰸���)
      - [getActiveVersion](#getActiveVersion-��ѯ�ڵ������Ч�汾)
      - [getProgramVersion](#getProgramVersion-��ѯ�ڵ����汾)
    - [RestrictingPlanContract](#RestrictingPlanContract)
      - [createRestrictingPlan](#createRestrictingPlan-�������ּƻ�)
      - [getRestrictingInfo](#getRestrictingInfo-��ȡ������Ϣ)
    - [SlashContract](#SlashContract)
      - [reportDoubleSign](#reportDoubleSign-�ٱ���ǩ)
      - [checkDuplicateSign](#checkDuplicateSign-��ѯ�ӿ��Ƿ��Ѿ����ٱ���ǩ)
- [web3](#web3)
  - [web3 eth��� (��׼JSON RPC )](#web3-eth���-��׼json-rpc)

## ����
> Javascript SDK��Bubble����js�����ߣ��ṩ��Bubble������js�������߰�

## ��������

### ��װ������

ͨ��node.js���룺

`cnpm i https://github.com/bubblenet/client-sdk-js`

### ��ʼ������

Ȼ������Ҫ����һ��web3��ʵ��������һ��provider��Ϊ�˱�֤�㲻�Ḳ��һ�����е�provider������ʹ��Mistʱ�����ã���Ҫ�ȼ���Ƿ�web3ʵ���Ѵ��ڡ�

```js
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:6789'));
}
```
## ��Լ
> Bubble�����ṩ������������API

### ��Լ��ʼ�����ӿڵ���

```
const cid = web3.version.network;
web3.[ContractName].init(web3,cid);

web3.[ContractName].[funcName]();
```
#### ʾ��

```
const cid = web3.version.network;
web3.StakingContract.init(web3,cid);

let stakeParams = {
  from:'0x493301712671Ada506ba6Ca7891F436D29185821',
  privateKey:'a11859ce23effc663a9460e332ca09bd812acc390497f8dc7542b6938e13f8d7',
  value:0,
  typ:1,
  benifitAddress:'0x12c171900f010b17e969702efa044d077e868082',
  nodeId:'f71e1bc638456363a66c4769284290ef3ccff03aba4a22fb60ffaed60b77f614bfd173532c3575abe254c366df6f4d6248b929cb9398aaac00cbcc959f7b2b7c',
  externalId:'111111',
  nodeName:'bubble',
  website:'https://www.test.network',
  details:'supper node',
  amount:1000000000000000000000000,
  processVersion:1792,
}

web3.stakingContract.staking(stakingParams).then(res=>{
    console.log(res); // {result:true,data:'0x03aba4a22fb60ffaed60b77f614bfd173532c357'}
}).catch(err=>{
    console.log(err);
});
```
<a name="��ԼAPI"></a>

### ��ԼAPI

#### �ӿ�˵��

���º�Լ�ӿ�δ�г����ز����ļ�Ϊ���׽ӿڣ�����Ϊ��ѯ�ӿ�
���׽ӿ�ͳһ���ز�����ʽ���£�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|hash |String |��ѡ| ����hash|


#### StakingContract

<a name="staking-������Ѻ"></a>

##### staking-������Ѻ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|typ|Number  |��ѡ|��ʾʹ���˻����ɽ����˻������ֽ������Ѻ��0: ���ɽ� 1: ���ֽ��|
|benefitAddress|String  |��ѡ|���ڽ��ܳ��齱������Ѻ�����������˻�|
|nodeId|String  |��ѡ|����Ѻ�Ľڵ�Id|
|externalId|String  |��ѡ|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|nodeName|String  |��ѡ|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|website|String  |��ѡ|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|details|String  |��ѡ|�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|amount|Number  |��ѡ|��Ѻ��von|
|programVersion|Number  |��ѡ|�������ʵ�汾������rpc��ȡ|

<a name="updateStakingInfo-�޸���Ѻ��Ϣ"></a>

##### updateStakingInfo-�޸���Ѻ��Ϣ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|typ|Number  |��ѡ|��ʾʹ���˻����ɽ����˻������ֽ�0: ���ɽ� 1: ���ֽ��|
|benefitAddress|String  |��ѡ|���ڽ��ܳ��齱������Ѻ�����������˻�|
|nodeId|String  |��ѡ|����Ѻ�Ľڵ�Id|
|externalId|String  |��ѡ|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|nodeName|String  |��ѡ|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|website|String  |��ѡ|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|details|String  |��ѡ|�ڵ������(�г������ƣ���ʾ�ýڵ������)|

<a name="unStaking-������Ѻ"></a>

##### unStaking-������Ѻ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|nodeId|String  |��ѡ|����Ѻ�Ľڵ�Id|

<a name="addStaking-������Ѻ"></a>

##### addStaking-������Ѻ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|nodeId|String  |��ѡ|����Ѻ�Ľڵ�Id|
|typ|Number  |��ѡ|��ʾʹ���˻����ɽ����˻������ֽ�0: ���ɽ� 1: ���ֽ��|
|amount|Number  |��ѡ|��Ѻ��von|

<a name="GetStakingInfo-��ȡ��Ѻ��Ϣ"></a>

##### GetStakingInfo-��ȡ��Ѻ��Ϣ

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|nodeId|String  |��ѡ|����Ѻ�Ľڵ�Id|

���Σ� �б�

|����|����|˵��|
|---|---|---|
|NodeId|64bytes|����Ѻ�Ľڵ�Id(Ҳ�к�ѡ�˵Ľڵ�Id)|
|StakingAddress|20bytes|������Ѻʱʹ�õ��˻�(����������Ѻ��Ϣֻ��������˻���������Ѻʱ��von�ᱻ�˻ظ��˻����߸��˻���������Ϣ��)|
|BenefitAddress|20bytes|���ڽ��ܳ��齱������Ѻ�����������˻�|
|StakingTxIndex|uint32(4bytes)|������Ѻʱ�Ľ�������|
|ProgramVersion|uint32(4bytes)|����Ѻ�ڵ��Bubble���̵���ʵ�汾��(��ȡ�汾�ŵĽӿ��������ṩ)|
|Status|uint32(4bytes)|��ѡ�˵�״̬(״̬�Ǹ���uint32��32bit�����õģ���ͬʱ���ڶ��״̬��ֵΪ���ͬʱ���ڵ�״ֵ̬���0: �ڵ���� (32��bitȫΪ0)�� 1: �ڵ㲻���� (ֻ�����һbitΪ1)�� 2�� �ڵ�����ʵ�(ֻ�е����ڶ�bitΪ1)�� 4�� �ڵ��von���������Ѻ�ż�(ֻ�е�������bitΪ1)�� 8���ڵ㱻�ٱ�˫ǩ(ֻ�е�������bitΪ1))|
|StakingEpoch|uint32(4bytes)|��ǰ�����Ѻ���ʱ�Ľ�������|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|
|Shares|*big.Int(bytes)|��ǰ��ѡ���ܹ���Ѻ�ӱ�ί�е�von��Ŀ|
|Released|*big.Int(bytes)|������Ѻ�˻������ɽ�����������Ѻ��von|
|ReleasedHes|*big.Int(bytes)|������Ѻ�˻������ɽ�����ԥ����Ѻ��von|
|RestrictingPlan|*big.Int(bytes)|������Ѻ�˻������ֽ�����������Ѻ��von|
|RestrictingPlanHes|*big.Int(bytes)|������Ѻ�˻������ֽ�����ԥ����Ѻ��von|
|ExternalId|string|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|NodeName|string|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|Website|string|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|Details|string|�ڵ������(�г������ƣ���ʾ�ýڵ������)|



#### NodeContract

<a name="GetVerifierList-��ѯ��ǰ�������ڵ���֤�˶���"></a>

##### GetVerifierList-��ѯ��ǰ�������ڵ���֤�˶���

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|NodeId|64bytes|����Ѻ�Ľڵ�Id(Ҳ�к�ѡ�˵Ľڵ�Id)|
|StakingAddress|20bytes|������Ѻʱʹ�õ��˻�(����������Ѻ��Ϣֻ��������˻���������Ѻʱ��von�ᱻ�˻ظ��˻����߸��˻���������Ϣ��)|
|BenefitAddress|20bytes|���ڽ��ܳ��齱������Ѻ�����������˻�|
|StakingTxIndex|uint32(4bytes)|������Ѻʱ�Ľ�������|
|ProgramVersion|uint32|����Ѻ�ڵ��Bubble���̵���ʵ�汾��(��ȡ�汾�ŵĽӿ��������ṩ)|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|
|Shares|*big.Int(bytes)|��ǰ��ѡ���ܹ���Ѻ�ӱ�ί�е�von��Ŀ|
|ExternalId|string|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|NodeName|string|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|Website|string|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|Details|string|�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|ValidatorTerm|uint32(4bytes)|��֤�˵�����(�ڽ������ڵ�101����֤�˿�������Զ��0��ֻ���ڹ�ʶ�ֵ���֤��ʱ�Żᱻ��ֵ���ձ�ѡ����ʱҲ��0����������ʱ��+1)|

<a name="getValidatorList-��ѯ��ǰ��ʶ���ڵ���֤���б�"></a>

##### getValidatorList-��ѯ��ǰ��ʶ���ڵ���֤���б�

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|NodeId|64bytes|����Ѻ�Ľڵ�Id(Ҳ�к�ѡ�˵Ľڵ�Id)|
|StakingAddress|20bytes|������Ѻʱʹ�õ��˻�(����������Ѻ��Ϣֻ��������˻���������Ѻʱ��von�ᱻ�˻ظ��˻����߸��˻���������Ϣ��)|
|BenefitAddress|20bytes|���ڽ��ܳ��齱������Ѻ�����������˻�|
|StakingTxIndex|uint32(4bytes)|������Ѻʱ�Ľ�������|
|ProgramVersion|uint32(4bytes)|����Ѻ�ڵ��Bubble���̵���ʵ�汾��(��ȡ�汾�ŵĽӿ��������ṩ)|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|
|Shares|*big.Int(bytes)|��ǰ��ѡ���ܹ���Ѻ�ӱ�ί�е�von��Ŀ|
|ExternalId|string|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|NodeName|string|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|Website|string|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|Details|string|�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|ValidatorTerm|uint32(4bytes)|��֤�˵�����(�ڽ������ڵ�101����֤�˿�������Զ��0��ֻ���ڹ�ʶ�ֵ���֤��ʱ�Żᱻ��ֵ���ձ�ѡ����ʱҲ��0����������ʱ��+1)|

<a name="getCandidateList-��ѯ����ʵʱ�ĺ�ѡ���б�"></a>

##### getCandidateList-��ѯ����ʵʱ�ĺ�ѡ���б�

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|NodeId|64bytes|����Ѻ�Ľڵ�Id(Ҳ�к�ѡ�˵Ľڵ�Id)|
|StakingAddress|20bytes|������Ѻʱʹ�õ��˻�(����������Ѻ��Ϣֻ��������˻���������Ѻʱ��von�ᱻ�˻ظ��˻����߸��˻���������Ϣ��)|
|BenefitAddress|20bytes|���ڽ��ܳ��齱������Ѻ�����������˻�|
|StakingTxIndex|uint32(4bytes)|������Ѻʱ�Ľ�������|
|ProgramVersion|uint32(4bytes)|����Ѻ�ڵ��Bubble���̵���ʵ�汾��(��ȡ�汾�ŵĽӿ��������ṩ)|
|Status|uint32(4bytes)|��ѡ�˵�״̬(״̬�Ǹ���uint32��32bit�����õģ���ͬʱ���ڶ��״̬��ֵΪ���ͬʱ���ڵ�״ֵ̬���0: �ڵ���� (32��bitȫΪ0)�� 1: �ڵ㲻���� (ֻ�����һbitΪ1)�� 2�� �ڵ�����ʵ�(ֻ�е����ڶ�bitΪ1)�� 4�� �ڵ��von���������Ѻ�ż�(ֻ�е�������bitΪ1)�� 8���ڵ㱻�ٱ�˫ǩ(ֻ�е�������bitΪ1))|
|StakingEpoch|uint32(4bytes)|��ǰ�����Ѻ���ʱ�Ľ�������|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|
|Shares|*big.Int(bytes)|��ǰ��ѡ���ܹ���Ѻ�ӱ�ί�е�von��Ŀ|
|Released|*big.Int(bytes)|������Ѻ�˻������ɽ�����������Ѻ��von|
|ReleasedHes|*big.Int(bytes)|������Ѻ�˻������ɽ�����ԥ����Ѻ��von|
|RestrictingPlan|*big.Int(bytes)|������Ѻ�˻������ֽ�����������Ѻ��von|
|RestrictingPlanHes|*big.Int(bytes)|������Ѻ�˻������ֽ�����ԥ����Ѻ��von|
|ExternalId|string|�ⲿId(�г������ƣ�����������ȡ�ڵ�������Id)|
|NodeName|string|����Ѻ�ڵ������(�г������ƣ���ʾ�ýڵ������)|
|Website|string|�ڵ�ĵ�������ҳ(�г������ƣ���ʾ�ýڵ����ҳ)|
|Details|string|�ڵ������(�г������ƣ���ʾ�ýڵ������)|



#### DelegateContract

<a name="delegate-����ί��"></a>

##### delegate-����ί��

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|typ|Number  |��ѡ|��ʾʹ���˻����ɽ����˻������ֽ�0: ���ɽ� 1: ���ֽ��|
|nodeId|String  |��ѡ|ί�еĽڵ�Id|
|amount|Number  |��ѡ|ί�еĽ��|

<a name="withdrewDelegate-����ί��"></a>

##### withdrewDelegate-����ί��

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|stakingBlockNum|Number  |��ѡ|��ѺΨһ��ʶ|
|nodeId|String  |��ѡ|ί�еĽڵ�Id|
|amount|Number  |��ѡ|����ί�еĽ��|

<a name="GetRelatedListByDelAddr-��ѯ��ǰ�˻���ַ��ί�еĽڵ��NodeID����ѺId"></a>

##### GetRelatedListByDelAddr-��ѯ��ǰ�˻���ַ��ί�еĽڵ��NodeID����ѺId

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|addr|String  |��ѡ|ί���˵��˻���ַ|

���Σ� �б�

|����|����|˵��|
|---|---|---|
|Addr|20bytes|��֤�˽ڵ�ĵ�ַ|
|NodeId|64bytes|��֤�˵Ľڵ�Id|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|

<a name="GetDelegateInfo-��ѯ��ǰ����ί����Ϣ"></a>

##### GetDelegateInfo-��ѯ��ǰ����ί����Ϣ

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|stakingBlockNum|Number  |��ѡ|������Ѻʱ������߶�|
|delAddr|String  |��ѡ|ί���˵��˻���ַ|
|nodeId|String  |��ѡ|��֤�˵Ľڵ�Id|

���Σ� �б�

|����|����|˵��|
|---|---|---|
|Addr|20bytes|ί���˵��˻���ַ|
|NodeId|64bytes|��֤�˵Ľڵ�Id|
|StakingBlockNum|uint64(8bytes)|������Ѻʱ������߶�|
|DelegateEpoch|uint32(4bytes)|���һ�ζԸú�ѡ�˷����ί��ʱ�Ľ�������|
|Released|*big.Int(bytes)|����ί���˻������ɽ���������ί�е�von|
|ReleasedHes|*big.Int(bytes)|����ί���˻������ɽ�����ԥ��ί�е�von|
|RestrictingPlan|*big.Int(bytes)|����ί���˻������ֽ���������ί�е�von|
|RestrictingPlanHes|*big.Int(bytes)|����ί���˻������ֽ�����ԥ��ί�е�von|
|Reduction|*big.Int(bytes)|���ڳ����ƻ��е�von|


#### ProposalContract

<a name="submitText-�ύ�ı��᰸"></a>

##### submitText-�ύ�ı��᰸

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|verifier|String  |��ѡ|�ύ�᰸����֤��|
|githubID|String  |��ѡ|�᰸��github�ϵ�ID|
|topic|String  |��ѡ|�᰸����|
|desc|String  |��ѡ|�᰸����|
|url|String  |��ѡ|�᰸URL|
|endVotingBlock|Number  |��ѡ|�᰸ͶƱ��ֹ���|

<a name="submitParam-�ύ�����᰸"></a>

##### submitParam-�ύ�����᰸

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|verifier|String  |��ѡ|�ύ�᰸����֤��|
|githubID|String  |��ѡ|�᰸��github�ϵ�ID|
|topic|String  |��ѡ|�᰸����|
|desc|String  |��ѡ|�᰸����|
|url|String  |��ѡ|�᰸URL|
|endVotingBlock|Number  |��ѡ|�᰸ͶƱ��ֹ���|
|paramName|String  |��ѡ|��������|
|currentValue|String  |��ѡ|��ǰֵ|
|newValue|Number  |��ѡ|�µ�ֵ|

<a name="submitVersion-�ύ�����᰸"></a>

##### submitVersion-�ύ�����᰸

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|verifier|String  |��ѡ|�ύ�᰸����֤��|
|githubID|String  |��ѡ|�᰸��github�ϵ�ID|
|topic|String  |��ѡ|�᰸����|
|desc|String  |��ѡ|�᰸����|
|url|String  |��ѡ|�᰸URL|
|newVersion|String  |��ѡ|�����汾|
|endVotingBlock|Number  |��ѡ|�᰸ͶƱ��ֹ���|
|activeBlock|String  |��ѡ|��Ч���|

<a name="vote-���᰸ͶƱ"></a>

##### vote-���᰸ͶƱ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|verifier|String  |��ѡ|�ύ�᰸����֤��|
|proposalID|String  |��ѡ|�᰸ID|
|option|String  |��ѡ|ͶƱѡ��|
|programVersion|Number  |��ѡ|�ڵ����汾|

<a name="declareVersion-�汾����"></a>

##### declareVersion-�汾����

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|activeNode|String  |��ѡ|�����Ľڵ㣬ֻ������֤��/��ѡ��|
|version|String  |��ѡ|�����İ汾|

<a name="getProposal-��ѯ�᰸"></a>

##### getProposal-��ѯ�᰸

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|proposalID |String |��ѡ| �᰸ID|

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|

<a name="listProposal-��ѯ�᰸�б�"></a>

##### listProposal-��ѯ�᰸�б�

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|

<a name="getTallyResult-��ѯ�᰸���"></a>

##### getTallyResult-��ѯ�᰸���

��Σ�

| ������ |����|����|����˵��|
|proposalID |String |��ѡ| �᰸ID|

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|

<a name="getActiveVersion-��ѯ�ڵ������Ч�汾"></a>

##### getActiveVersion-��ѯ�ڵ������Ч�汾

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|

<a name="getProgramVersion-��ѯ�ڵ����汾"></a>

##### getProgramVersion-��ѯ�ڵ����汾

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|

<a name="listParam-��ѯ�����������б�"></a>

##### listParam-��ѯ�����������б�

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
��

���Σ� �б�

|����|����|˵��|
|---|---|---|
|��|String|json�ַ���|


#### RestrictingPlanContract

<a name="createRestrictingPlan-�������ּƻ�"></a>

##### createRestrictingPlan-�������ּƻ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|account|String  |��ѡ|�����ͷŵ����˻�|
|Plan|Array  |��ѡ|[{Epoch:Number,Amount:Number}],(Epoch����ʾ�������ڵı�����Amount����ʾĿ�������ϴ��ͷŵĽ��|

<a name="getRestrictingInfo-��ȡ������Ϣ"></a>

##### getRestrictingInfo-��ȡ������Ϣ

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|account|String  |��ѡ|�����ͷŵ����˻�|

���Σ�

| ����    | ����            | ˵��                                                         |
| ------- | --------------- | ------------------------------------------------------------ |
| balance | *big.Int(bytes) | �������                                                     |
| debt    | *big.Int(bytes) | symbolΪ true��debt ��ʾǷ�ͷŵĿ��Ϊ false��debt ��ʾ�ɵֿ��ͷŵĽ�� |
| symbol  | bool            | debt �ķ���                                                  |
| info    | bytes           | ���ַ�¼��Ϣ��json���飺[{"blockNumber":"","amount":""},...,{"blockNumber":"","amount":""}]�����У�<br/>blockNumber��\*big.Int���ͷ�����߶�<br/>amount��\*big.Int���ͷŽ�� |


#### SlashContract

<a name="reportDoubleSign-�ٱ���ǩ"></a>

##### reportDoubleSign-�ٱ���ǩ

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|from |String |��ѡ| ���ͽ��׵��˻���ַ|
|privateKey|String  |��ѡ|���ͽ��׵��˻�˽Կ|
|value|Number  |��ѡ|���ͽ��׵Ľ��|
|data|String  |��ѡ|֤�ݵ�jsonֵ|

<a name="checkDuplicateSign-��ѯ�ӿ��Ƿ��Ѿ����ٱ���ǩ"></a>

##### checkDuplicateSign-��ѯ�ӿ��Ƿ��Ѿ����ٱ���ǩ

��Σ�

| ������ |����|����|����˵��|
| :------: |:------: |:------: | :------: |
|typ|String  |��ѡ|����˫ǩ����, 1��prepare��2��viewChange|
|addr|String  |��ѡ|�ٱ��Ľڵ��ַ|
|blockNumber|Number  |��ѡ|��ǩ�Ŀ��|

���Σ�

| ����   | ����           |
| ------ | -------------- |
| 16���� | �ٱ��Ľ���Hash |

### web3

<a name="web3-eth���-��׼json-rpc"></a>

#### web3 eth��� (��׼JSON RPC )
- api��ʹ����ο�[web3j github](https://github.com/ethereum/wiki/wiki/JavaScript-API)
